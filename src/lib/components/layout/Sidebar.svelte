<script lang="ts">
	import { page } from '$app/stores';
	import {
		LayoutDashboard,
		Settings,
		LogOut,
		BookOpen,
		Pin,
		Activity,
		Sun,
		Moon
	} from '@lucide/svelte';
	import { onMount } from 'svelte';

	// Check if link is active
	let currentPath = $derived($page.url.pathname);
	function isActive(href: string) {
		return currentPath === href;
	}

	// Theme Toggle Logic
	let isDark = $state(true);

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			isDark = savedTheme === 'dark';
		} else {
			isDark = document.documentElement.classList.contains('dark');
		}
		// Sync initial state
		if (isDark) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	});
</script>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
	<div class="flex h-14 items-center border-b border-sidebar-border px-6">
		<a href="/" class="flex items-center gap-2 font-semibold">
			<span class="text-xl font-bold tracking-tight">ArgoUI</span>
		</a>
	</div>

	<div class="flex-1 overflow-auto py-4">
		<nav class="grid items-start px-4 text-sm font-medium">
			<a
				href="/"
				class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-accent ${isActive('/') ? 'bg-sidebar-accent text-sidebar-primary-foreground' : 'text-sidebar-foreground/70'}`}
			>
				<LayoutDashboard class="h-4 w-4" />
				Applications
			</a>
			<a
				href="/settings"
				class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-accent ${isActive('/settings') ? 'bg-sidebar-accent text-sidebar-primary-foreground' : 'text-sidebar-foreground/70'}`}
			>
				<Settings class="h-4 w-4" />
				Settings
			</a>
			<a
				href="/docs"
				class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-accent ${isActive('/docs') ? 'bg-sidebar-accent text-sidebar-primary-foreground' : 'text-sidebar-foreground/70'}`}
			>
				<BookOpen class="h-4 w-4" />
				Documentation
			</a>
		</nav>

		<div class="mt-8 px-4">
			<h4 class="mb-2 px-2 text-xs font-semibold tracking-tight text-sidebar-foreground/50 uppercase">
				Favorites
			</h4>
			<nav class="grid items-start text-sm font-medium">
				<div class="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-accent cursor-pointer">
					<Pin class="h-4 w-4 rotate-45" />
					<span>production-api</span>
				</div>
				<div class="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-accent cursor-pointer">
					<Pin class="h-4 w-4 rotate-45" />
					<span>frontend-main</span>
				</div>
			</nav>
		</div>

		<!-- Cluster Status Widget Placeholder -->
		<div class="mt-8 px-4">
			<h4 class="mb-2 px-2 text-xs font-semibold tracking-tight text-sidebar-foreground/50 uppercase">
				Cluster Health
			</h4>
			<div class="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3">
				<div class="flex items-center gap-2 mb-2">
					<Activity class="h-4 w-4 text-green-500" />
					<span class="text-xs font-medium">System Normal</span>
				</div>
				<div class="h-8 flex items-end gap-1">
					<div class="w-1 h-4 bg-green-500/50 rounded-sm"></div>
					<div class="w-1 h-6 bg-green-500/50 rounded-sm"></div>
					<div class="w-1 h-3 bg-green-500/50 rounded-sm"></div>
					<div class="w-1 h-5 bg-green-500/50 rounded-sm"></div>
					<div class="w-1 h-8 bg-green-500/50 rounded-sm"></div>
					<div class="w-1 h-4 bg-green-500/50 rounded-sm"></div>
					<div class="w-1 h-6 bg-green-500/50 rounded-sm"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="border-t border-sidebar-border p-4">
		<div class="flex items-center justify-between mb-4 px-2">
			<span class="text-xs font-medium text-sidebar-foreground/70">Theme</span>
			<button onclick={toggleTheme} class="p-1 rounded-md hover:bg-sidebar-accent transition-colors">
				{#if isDark}
					<Moon class="h-4 w-4" />
				{:else}
					<Sun class="h-4 w-4" />
				{/if}
			</button>
		</div>

		<div class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent group cursor-pointer">
			<div class="h-8 w-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sidebar-primary font-bold">
				U
			</div>
			<div class="flex flex-col overflow-hidden">
				<span class="truncate text-sm font-medium">User</span>
				<span class="truncate text-xs text-sidebar-foreground/70">user@example.com</span>
			</div>
		</div>
		<form action="/logout" method="POST" class="mt-2">
			<button type="submit" class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10">
				<LogOut class="h-4 w-4" />
				Logout
			</button>
		</form>
	</div>
</aside>
