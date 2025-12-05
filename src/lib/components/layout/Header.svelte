<script lang="ts">
	import { page } from '$app/stores';

	// Helper to generate breadcrumbs from path
	function getBreadcrumbs(path: string) {
		const parts = path.split('/').filter(Boolean);
		return parts.map((part, index) => ({
			name: part.charAt(0).toUpperCase() + part.slice(1),
			href: '/' + parts.slice(0, index + 1).join('/')
		}));
	}

	let breadcrumbs = $derived(getBreadcrumbs($page.url.pathname));
</script>

<header class="flex h-14 items-center gap-4 border-b border-border bg-background px-6 lg:h-[60px]">
	<div class="flex-1">
		<nav class="flex items-center text-sm text-muted-foreground">
			<a href="/" class="hover:text-foreground transition-colors">Home</a>
			{#each breadcrumbs as crumb}
				<span class="mx-2">/</span>
				<a href={crumb.href} class="hover:text-foreground transition-colors font-medium text-foreground/80 last:text-foreground last:font-bold">
					{crumb.name}
				</a>
			{/each}
		</nav>
	</div>
	
	<div class="flex items-center gap-2">
		<div class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
			<div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
			<span class="text-xs font-medium text-green-600 dark:text-green-400">Connected</span>
		</div>
	</div>
</header>
