export interface Env {
	SUDO_AUTH_B64?: string;
	ALLOW_DEV_DEFAULT_AUTH?: string;
}

export type ExtendedCfProperties = Partial<IncomingRequestCfProperties> & {
	corporateProxy?: boolean | string;
};

export interface ServerTelemetry {
	'edge metadata': {
		colo: string;
		continent: string | undefined;
		country: string | undefined;
		region: string | undefined;
		city: string | undefined;
		latitude: string | undefined;
		longitude: string | undefined;
		postal_code: string | undefined;
		metro_code: string | undefined;
		timezone: string | undefined;
		is_eu_country: boolean;
	};
	'tls & network': {
		http_protocol: string | undefined;
		tls_version: string | undefined;
		tls_cipher: string | undefined;
		client_tcp_rtt: number | undefined;
		asn: number | undefined;
		as_org: string | undefined;
		ip: string;
	};
	'threat intelligence': {
		bot_management_score: number | 'unknown';
		verified_bot: boolean;
		client_trust_score: number | 'unknown';
		corporate_proxy: boolean;
		is_tor: boolean;
		threat_tier: 'high' | 'low';
	};
	'request context': {
		method: string;
		url: string;
		ray_id: string | null;
		cache_status: string;
		worker_execution_time_ms: number;
		headers: Record<string, string>;
	};
}
