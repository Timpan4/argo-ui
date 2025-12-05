<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import { page } from '$app/stores';
	
	let { children } = $props();

	let isLoginPage = $derived($page.url.pathname === '/login');
</script>

{#if isLoginPage}
	{@render children()}
{:else}
	<div class="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
		<Sidebar />
		<div class="flex flex-col">
			<Header />
			<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
				{@render children()}
			</main>
		</div>
	</div>
{/if}