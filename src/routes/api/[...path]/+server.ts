import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import https from 'https';

// Create an agent that ignores self-signed certificates if ARGO_INSECURE is set
const insecureAgent = new https.Agent({
	rejectUnauthorized: false
});

export const fallback: RequestHandler = async ({ request, params, fetch, cookies }) => {
	const path = params.path ?? '';
	const targetUrl = `${env.ARGO_SERVER}/api/${path}`;
	
	// Determine if we need the insecure agent
	const useInsecure = env.ARGO_INSECURE === 'true';
	const agent = useInsecure && targetUrl.startsWith('https') ? insecureAgent : undefined;

	// Prepare headers
	const headers = new Headers(request.headers);
	headers.delete('host'); // Let the target set the host
	headers.delete('connection');

	// If we have an auth cookie (from our login page), pass it as a Bearer token
	// (ArgoCD expects 'Authorization: Bearer <token>' or a cookie named 'argocd.token')
	const token = cookies.get('argocd.token') || env.ARGO_TOKEN;
	if (token && !headers.has('authorization')) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	try {
		console.log(`[Proxy] ${request.method} ${path} -> ${targetUrl}`);
		
		// We use the global fetch, but with a custom agent if needed.
		// Note: SvelteKit's 'fetch' is special, but for proxying external resources
		// sometimes native node-fetch or passing the agent is required.
		// In Vite/Node dev server, we can pass the agent to the fetch options if supported,
		// or use a custom fetch.
		
		const response = await fetch(targetUrl, {
			method: request.method,
			headers,
			body: request.body,
			// @ts-ignore - 'agent' is not in standard RequestInit but works in Node-based fetch environments
			agent: agent, 
			duplex: 'half' // Required for streaming bodies in some node-fetch versions
		});

		// Forward the response back to the client
		const responseHeaders = new Headers(response.headers);
		// Cleanup CORS/Security headers that might conflict
		responseHeaders.delete('content-encoding');
		responseHeaders.delete('content-length');

		return new Response(response.body, {
			status: response.status,
			headers: responseHeaders
		});

	} catch (err) {
		console.error('[Proxy Error]', err);
		return new Response(JSON.stringify({ error: 'Failed to proxy request', details: String(err) }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
