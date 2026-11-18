import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import { constantTimeEqual } from '../src/server/auth';
import { buildServerTelemetry, serializeJsonForScript } from '../src/server/telemetry';
import { escapeHtml } from '../src/templates/resume';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

function extractInlineScript(html: string): { nonce: string; code: string } {
	const match = html.match(/<script nonce="([^"]+)">([\s\S]*?)<\/script>/);
	expect(match).not.toBeNull();
	return { nonce: match![1], code: match![2] };
}

describe('resume-worker', () => {
	describe('GET / (resume page)', () => {
		it('serves the HTML resume with security headers and matching CSP nonce (unit style)', async () => {
			const request = new IncomingRequest('https://resume.jordanlenchitz.org/');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toBe('text/html;charset=UTF-8');
			expect(response.headers.get('cache-control')).toBe('private, no-store');
			expect(response.headers.get('x-content-type-options')).toBe('nosniff');
			expect(response.headers.get('x-frame-options')).toBe('DENY');
			expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
			expect(response.headers.get('server-timing')).toMatch(/^edge-now;dur=\d+$/);

			const html = await response.text();
			const { nonce, code } = extractInlineScript(html);

			const csp = response.headers.get('content-security-policy') ?? '';
			expect(csp).toContain(`script-src 'nonce-${nonce}'`);
			expect(csp).not.toContain("script-src 'unsafe-inline'");
			expect(csp).toContain('https://ipv6.icanhazip.com');
			expect(csp).toContain('https://dns.google');
			expect(csp).toContain('https://stat.ripe.net');

			expect(() => new Function(code)).not.toThrow();

			expect(html).toContain('<title>resume | jordan lenchitz</title>');
			expect(html).toContain('(<a href="https://linkedin.com/in/jordan-lenchitz">linkedin</a> <a href="https://github.com/jordan-lenchitz">github</a> <a href="https://yottadb.com/yottadb-as-a-creative-platform-experimental-video-art-at-scale/">blog</a>)');
			expect(html).toContain('<h3>systems engineer and experimental artist</h3>');
			expect(html).toContain('<h2>references and esoteric trivia available upon request</h2>\n  <p><a href="https://github.com/jordan-lenchitz/resume-worker">source code of this resume</a></p>\n\n  <h2>contact</h2>');
			expect(html).toContain('honors in mathematics');
			expect(html).not.toContain('mathemitics');
			expect(html).not.toContain('onclick=');
			expect(html).not.toContain('.innerHTML');
			expect(html).toContain('data-theme="theme-dark"');
			expect(html).toContain('body.theme-dark { --bg-color: #000; --text-color: #fff; --heading-color: #fff; --link-color: #e87458;');
			expect(html).toContain('id="ip-display"');
			expect(html).toContain('id="path-display"');
			expect(html).toContain('id="plumbing-details"');
			expect(html).toContain('id="trivia-details"');
			expect(html).toContain('<div class="signature-box">');
			expect(html).toContain('<p class="signature-label">digitally signed');
			expect(html).toContain('<pre class="signature-block">-----begin x.509 signature block-----');
		});

		it('responds cleanly through SELF integration fetch', async () => {
			const response = await SELF.fetch('https://example.com/');
			expect(response.status).toBe(200);
			const html = await response.text();
			expect(html).toContain('resume | jordan lenchitz');
			expect(html).toContain('-----begin x.509 signature block-----');
		});

		it('redacts sensitive headers and escapes script-breaking characters in telemetry JSON', async () => {
			const request = new IncomingRequest('https://example.com/?q=</script><script>alert(1)</script>', {
				headers: {
					Authorization: 'Bearer super-secret-token',
					'Proxy-Authorization': 'Basic c2VjcmV0',
					'X-Test': '</script>',
				},
			});
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			const html = await response.text();
			const { code } = extractInlineScript(html);

			expect(code).not.toContain('super-secret-token');
			expect(code).not.toContain('c2VjcmV0');
			expect(code).toContain('[REDACTED]');
			expect(code).not.toContain('</script>');
			expect(code).toContain('\\u003c/script\\u003e');
			expect(() => new Function(code)).not.toThrow();
		});
	});

	describe('GET /sudo', () => {
		it('fails closed with 503 when SUDO_AUTH_B64 is unset on non-local hostnames', async () => {
			const request = new IncomingRequest('https://resume.jordanlenchitz.org/sudo');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, {}, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(503);
			expect(response.headers.get('cache-control')).toBe('private, no-store');
			expect(await response.text()).toBe('sudo auth not configured');
		});

		it('allows default admin:admin fallback on localhost only', async () => {
			const unauthReq = new IncomingRequest('http://localhost/sudo');
			const unauthCtx = createExecutionContext();
			const unauthRes = await worker.fetch(unauthReq, {}, unauthCtx);
			await waitOnExecutionContext(unauthCtx);

			expect(unauthRes.status).toBe(401);
			expect(unauthRes.headers.get('www-authenticate')).toBe('Basic realm="restricted telemetry access"');

			const authReq = new IncomingRequest('http://localhost/sudo', {
				headers: { Authorization: `Basic ${btoa('admin:admin')}` },
			});
			const authCtx = createExecutionContext();
			const authRes = await worker.fetch(authReq, {}, authCtx);
			await waitOnExecutionContext(authCtx);

			expect(authRes.status).toBe(200);
			const html = await authRes.text();
			const { code } = extractInlineScript(html);
			expect(code).toContain('window._authMode = true');
			expect(() => new Function(code)).not.toThrow();
		});

		it('enforces SUDO_AUTH_B64 and returns nonced diagnostics document on valid auth', async () => {
			const secretB64 = btoa('jordan:test-secret-pass');
			const testEnv = { SUDO_AUTH_B64: secretB64 };

			const badReq = new IncomingRequest('https://resume.jordanlenchitz.org/sudo', {
				headers: { Authorization: `Basic ${btoa('jordan:wrong')}` },
			});
			const badCtx = createExecutionContext();
			const badRes = await worker.fetch(badReq, testEnv, badCtx);
			await waitOnExecutionContext(badCtx);
			expect(badRes.status).toBe(401);

			const goodReq = new IncomingRequest('https://resume.jordanlenchitz.org/sudo', {
				headers: { Authorization: `Basic ${secretB64}` },
			});
			const goodCtx = createExecutionContext();
			const goodRes = await worker.fetch(goodReq, testEnv, goodCtx);
			await waitOnExecutionContext(goodCtx);

			expect(goodRes.status).toBe(200);
			expect(goodRes.headers.get('vary')).toBe('Authorization');
			expect(goodRes.headers.get('cache-control')).toBe('private, no-store');

			const html = await goodRes.text();
			const { nonce, code } = extractInlineScript(html);
			const csp = goodRes.headers.get('content-security-policy') ?? '';
			expect(csp).toContain(`script-src 'nonce-${nonce}'`);
			expect(csp).toContain("connect-src 'none'");
			expect(code).not.toContain('test-secret-pass');
			expect(code).toContain('[REDACTED]');
			expect(() => new Function(code)).not.toThrow();
		});
	});

	describe('unit helpers', () => {
		it('escapes HTML special characters', () => {
			expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
				'&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;',
			);
		});

		it('escapes script-unsafe characters in serializeJsonForScript', () => {
			const serialized = serializeJsonForScript({ a: '</script>\u2028\u2029' });
			expect(serialized).toBe('{"a":"\\u003c/script\\u003e\\u2028\\u2029"}');
		});

		it('compares strings in constant time across equal and unequal lengths', async () => {
			expect(await constantTimeEqual('Basic abc123', 'Basic abc123')).toBe(true);
			expect(await constantTimeEqual('Basic abc123', 'Basic abc124')).toBe(false);
			expect(await constantTimeEqual('Basic abc', 'Basic abc123')).toBe(false);
		});

		it('extracts cf threat intelligence and boolean corporateProxy accurately', () => {
			const fakeReq = {
				method: 'GET',
				url: 'https://resume.jordanlenchitz.org/',
				headers: new Headers({ 'cf-connecting-ip': '2001:db8::1', 'cf-ray': 'abc-IAD' }),
				cf: {
					colo: 'IAD',
					country: 'T1',
					isEUCountry: '1',
					botManagement: { score: 15, verifiedBot: false, corporateProxy: true },
					clientTrustScore: 15,
				},
			} as unknown as Request;

			const telemetry = buildServerTelemetry(fakeReq, Date.now());
			expect(telemetry['edge metadata'].is_eu_country).toBe(true);
			expect(telemetry['threat intelligence'].corporate_proxy).toBe(true);
			expect(telemetry['threat intelligence'].is_tor).toBe(true);
			expect(telemetry['threat intelligence'].threat_tier).toBe('high');
			expect(telemetry['tls & network'].ip).toBe('2001:db8::1');
		});
	});
});
