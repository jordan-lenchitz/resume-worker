import { buildResumeClientScript, buildSudoDocument } from './client/scripts';
import { verifySudoAuth } from './server/auth';
import { buildHtmlHeaders, generateCspNonce } from './server/headers';
import { buildServerTelemetry, serializeJsonForScript } from './server/telemetry';
import { renderResumePage } from './templates/resume';
import type { Env } from './types';

export type { Env };

export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		const startMs = Date.now();
		const url = new URL(request.url);
		const nonce = generateCspNonce();

		if (url.pathname === '/sudo') {
			const authResult = await verifySudoAuth(request, env, url);
			if (!authResult.authorized) {
				const headers: Record<string, string> = {
					'content-type': 'text/plain;charset=UTF-8',
					'cache-control': 'private, no-store',
					'x-content-type-options': 'nosniff',
				};
				if (authResult.status === 401) {
					headers['www-authenticate'] = 'Basic realm="restricted telemetry access"';
				}
				return new Response(authResult.body, {
					status: authResult.status,
					headers,
				});
			}

			const safeData = serializeJsonForScript(buildServerTelemetry(request, startMs));
			return new Response(buildSudoDocument(safeData, nonce), {
				headers: buildHtmlHeaders(nonce, startMs, true),
			});
		}

		const safeData = serializeJsonForScript(buildServerTelemetry(request, startMs));
		const scriptTag = buildResumeClientScript(safeData, nonce);

		return new Response(renderResumePage(scriptTag), {
			headers: buildHtmlHeaders(nonce, startMs, false),
		});
	},
};
