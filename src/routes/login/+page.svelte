<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	
	let { form, submitting } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>
				Enter your ArgoCD credentials to continue.
			</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<form method="POST" use:enhance class="grid gap-4">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input id="username" name="username" type="text" placeholder="admin" required />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>
				
				{#if form?.incorrect}
					<p class="text-sm text-red-500">Invalid credentials.</p>
				{/if}
				{#if form?.error}
					<p class="text-sm text-red-500">{form.error}</p>
				{/if}

				<Card.Footer class="px-0 pt-2">
					<Button type="submit" class="w-full">Sign in</Button>
				</Card.Footer>
			</form>
		</Card.Content>
	</Card.Root>
</div>
