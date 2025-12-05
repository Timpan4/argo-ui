import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import https from 'https';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('argocd.token');

	if (!token) {
		throw redirect(302, '/login');
	}

	// Fetch Applications
	const targetUrl = `${env.ARGO_SERVER}/api/v1/applications`;
	const useInsecure = env.ARGO_INSECURE === 'true';
	const agent = useInsecure && targetUrl.startsWith('https') 
		? new https.Agent({ rejectUnauthorized: false }) 
		: undefined;

	try {
		const res = await fetch(targetUrl, {
			headers: {
				'Authorization': `Bearer ${token}`
			},
			// @ts-ignore
			agent
		});

		if (res.status === 401) {
			// Token expired or invalid
			cookies.delete('argocd.token', { path: '/' });
			throw redirect(302, '/login');
		}

		if (!res.ok) {
			return { apps: [], error: `Failed to fetch apps: ${res.statusText}` };
		}

		const data = await res.json();
		return { apps: data.items || [] };

	} catch (err) {
		if ((err as any)?.status === 302) throw err;
		console.error('Dashboard load error:', err);
		return { apps: [], error: 'Could not connect to ArgoCD' };
	}
};
