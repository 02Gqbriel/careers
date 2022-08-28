<script lang="ts">
	import type { PageData } from './$types';

	import '$lib/base.css';
	import '$lib/variants.css';
	import '$lib/utilities.css';
	import '$lib/components.css';

	export let data: PageData;
</script>

<header>
	<h1>Carreers</h1>
</header>

<main class="grow">
	<table class="table-auto border-collapse w-full text-sm">
		<thead>
			<tr>
				<th>name:</th>
				<th>mail:</th>
				<th>url:</th>
			</tr>
		</thead>
		<tbody>
			{#each data.companies as company}
				<tr><td>{company.name}</td><td>{company.mail}</td><td>{company.url}</td></tr>
			{/each}
		</tbody>
	</table>
</main>

<footer>footer</footer>

<style>
	td,
	th {
		@apply text-left border-y p-3;
	}

	td {
		@apply p-3;
	}
</style>
