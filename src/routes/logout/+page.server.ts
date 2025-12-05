import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.delete('argocd.token', { path: '/' });
		throw redirect(302, '/login');
	}
};
