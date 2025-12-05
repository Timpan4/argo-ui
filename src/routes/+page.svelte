<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	let { data } = $props();
	
	// Helper for status colors
	function getHealthColor(status: string) {
		switch (status) {
			case 'Healthy': return 'bg-green-500 hover:bg-green-600';
			case 'Degraded': return 'bg-red-500 hover:bg-red-600';
			case 'Progressing': return 'bg-blue-500 hover:bg-blue-600';
			case 'Suspended': return 'bg-gray-500 hover:bg-gray-600';
			case 'Missing': return 'bg-yellow-500 hover:bg-yellow-600';
			default: return 'bg-gray-500';
		}
	}

	function getSyncColor(status: string) {
		switch (status) {
			case 'Synced': return 'bg-green-500 hover:bg-green-600';
			case 'OutOfSync': return 'bg-yellow-500 hover:bg-yellow-600';
			default: return 'bg-gray-500';
		}
	}
</script>

<div class="flex items-center justify-between mb-8">
	<h1 class="text-3xl font-bold tracking-tight">Applications</h1>
	<Button variant="outline" type="button" onclick={() => window.location.reload()}>Refresh</Button>
</div>

{#if data.error}
	<div class="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
		Error: {data.error}
	</div>
{/if}

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each data.apps as app}
		<Card.Root class="hover:border-zinc-400 transition-colors dark:hover:border-zinc-600">
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-lg font-medium truncate pr-2" title={app.metadata.name}>
					{app.metadata.name}
				</Card.Title>
				<!-- Health Status Dot -->
				<div class={`h-3 w-3 rounded-full flex-shrink-0 ${getHealthColor(app.status?.health?.status)}`} title={app.status?.health?.status}></div>
			</Card.Header>
			<Card.Content>
				<div class="text-sm text-zinc-500 dark:text-zinc-400 mb-4 truncate">
					{app.spec.destination.server === 'https://kubernetes.default.svc' ? 'in-cluster' : app.spec.destination.server}
					<span class="mx-1">•</span>
					{app.spec.destination.namespace}
				</div>
				
				<div class="flex gap-2 mt-4 flex-wrap">
					<Badge variant="secondary" class={getSyncColor(app.status?.sync?.status)}>
						{app.status?.sync?.status || 'Unknown'}
					</Badge>
					<Badge variant="outline" class="truncate max-w-[150px]">
						{(app.spec.source?.repoURL || app.spec.sources?.[0]?.repoURL || 'Unknown').split('/').pop()?.replace('.git', '')}
					</Badge>
				</div>
			</Card.Content>
		</Card.Root>
	{:else}
		{#if !data.error}
			<p class="text-zinc-500 col-span-3 text-center py-10">No applications found.</p>
		{/if}
	{/each}
</div>
