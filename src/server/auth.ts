import type { Env } from '../types';

const encoder = new TextEncoder();

export type SudoAuthResult =
	| { authorized: true }
	| { authorized: false; status: 401 | 503; body: string };

function isLocalDevHostname(hostname: string): boolean {
	const normalized = hostname.toLowerCase();
	return normalized === 'localhost' || normalized === '127.0.0.1' || normalized === '::1' || normalized === '[::1]';
}

// Hash both inputs so timingSafeEqual handles unequal lengths.
export async function constantTimeEqual(a: string, b: string): Promise<boolean> {
	const [digestA, digestB] = await Promise.all([
		crypto.subtle.digest('SHA-256', encoder.encode(a)),
		crypto.subtle.digest('SHA-256', encoder.encode(b)),
	]);
	return crypto.subtle.timingSafeEqual(digestA, digestB);
}

export async function verifySudoAuth(request: Request, env: Env, url: URL): Promise<SudoAuthResult> {
	const configuredB64 = env.SUDO_AUTH_B64?.trim();
	let expectedAuth: string | null = null;

	if (configuredB64) {
		expectedAuth = `Basic ${configuredB64}`;
	} else if (isLocalDevHostname(url.hostname) || env.ALLOW_DEV_DEFAULT_AUTH === 'true') {
		expectedAuth = `Basic ${btoa('admin:admin')}`;
	}

	if (!expectedAuth) {
		return {
			authorized: false,
			status: 503,
			body: 'sudo auth not configured',
		};
	}

	const providedAuth = request.headers.get('Authorization') ?? '';
	const matches = await constantTimeEqual(providedAuth, expectedAuth);
	if (!matches) {
		return {
			authorized: false,
			status: 401,
			body: 'unauthorized',
		};
	}

	return { authorized: true };
}
