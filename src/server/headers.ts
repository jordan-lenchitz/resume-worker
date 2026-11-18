export function generateCspNonce(): string {
	const bytes = new Uint8Array(16);
	crypto.getRandomValues(bytes);
	return btoa(String.fromCharCode(...bytes));
}

export function buildHtmlHeaders(nonce: string, startMs: number, isSudo = false): HeadersInit {
	const connectSrc = isSudo
		? "'none'"
		: "'self' https://ipv6.icanhazip.com https://ipv4.icanhazip.com https://dns.google https://stat.ripe.net";

	const csp = [
		"default-src 'none'",
		`script-src 'nonce-${nonce}'`,
		"style-src 'unsafe-inline'",
		"img-src 'self' data:",
		`connect-src ${connectSrc}`,
		"base-uri 'self'",
		"form-action 'none'",
		"frame-ancestors 'none'",
	].join('; ');

	const headers: Record<string, string> = {
		'content-type': 'text/html;charset=UTF-8',
		'cache-control': 'private, no-store',
		'content-security-policy': csp,
		'x-content-type-options': 'nosniff',
		'referrer-policy': 'strict-origin-when-cross-origin',
		'x-frame-options': 'DENY',
		'server-timing': `edge-now;dur=${startMs}`,
	};

	if (isSudo) {
		headers.vary = 'Authorization';
	}

	return headers;
}
