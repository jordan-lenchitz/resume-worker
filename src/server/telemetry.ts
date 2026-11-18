import type { ExtendedCfProperties, ServerTelemetry } from '../types';

const REDACTED_HEADERS = new Set(['authorization', 'proxy-authorization']);

export function redactHeaders(headers: Headers): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of headers.entries()) {
		result[key] = REDACTED_HEADERS.has(key.toLowerCase()) ? '[REDACTED]' : value;
	}
	return result;
}

export function buildServerTelemetry(request: Request, startMs: number): ServerTelemetry {
	const cf = request.cf as ExtendedCfProperties | undefined;
	const botScore = cf?.botManagement?.score;
	const isCorporateProxy = Boolean(cf?.botManagement?.corporateProxy || cf?.corporateProxy === '1');

	return {
		'edge metadata': {
			colo: cf?.colo || 'UNKNOWN',
			continent: cf?.continent,
			country: cf?.country,
			region: cf?.region,
			city: cf?.city,
			latitude: cf?.latitude,
			longitude: cf?.longitude,
			postal_code: cf?.postalCode,
			metro_code: cf?.metroCode,
			timezone: cf?.timezone,
			is_eu_country: cf?.isEUCountry === '1',
		},
		'tls & network': {
			http_protocol: cf?.httpProtocol,
			tls_version: cf?.tlsVersion,
			tls_cipher: cf?.tlsCipher,
			client_tcp_rtt: cf?.clientTcpRtt,
			asn: cf?.asn,
			as_org: cf?.asOrganization,
			ip: request.headers.get('cf-connecting-ip') || 'UNKNOWN',
		},
		'threat intelligence': {
			bot_management_score: botScore ?? 'unknown',
			verified_bot: cf?.botManagement?.verifiedBot ?? false,
			client_trust_score: cf?.clientTrustScore ?? 'unknown',
			corporate_proxy: isCorporateProxy,
			is_tor: cf?.country === 'T1',
			threat_tier: botScore !== undefined && botScore < 30 ? 'high' : 'low',
		},
		'request context': {
			method: request.method,
			url: request.url,
			ray_id: request.headers.get('cf-ray'),
			cache_status: request.headers.get('cf-cache-status') || 'MISS',
			worker_execution_time_ms: Date.now() - startMs,
			headers: redactHeaders(request.headers),
		},
	};
}

export function serializeJsonForScript(data: unknown): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029');
}
