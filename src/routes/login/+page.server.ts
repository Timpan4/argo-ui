import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import https from 'https';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('argocd.token');
	if (token) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username || !password) {
			return fail(400, { missing: true });
		}

		// Construct the login request to ArgoCD
		const targetUrl = `${env.ARGO_SERVER}/api/v1/session`;
		const useInsecure = env.ARGO_INSECURE === 'true';
		const agent = useInsecure && targetUrl.startsWith('https') 
			? new https.Agent({ rejectUnauthorized: false }) 
			: undefined;

		try {
			const response = await fetch(targetUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
				// @ts-ignore
				agent
			});

			if (!response.ok) {
				return fail(401, { incorrect: true });
			}

			const result = await response.json();
			const token = result.token;

			if (token) {
				cookies.set('argocd.token', token, {
					path: '/',
					httpOnly: true,
					secure: false, // set to true in prod
					maxAge: 60 * 60 * 24 // 1 day
				});
				throw redirect(302, '/');
			} else {
				return fail(500, { error: 'No token returned' });
			}

		} catch (err) {
			if ((err as any)?.status === 302) throw err; // Re-throw redirects
			console.error('Login error:', err);
			return fail(500, { error: 'Connection failed' });
		}
	}
};
