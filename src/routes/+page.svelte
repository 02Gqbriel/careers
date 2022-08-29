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
				<tr
					><td>{company.name}</td><td>{company.mail}</td><td
						><a href={company.url}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
									clip-rule="evenodd"
								/>
								<path
									fill-rule="evenodd"
									d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
									clip-rule="evenodd"
								/>
							</svg>
						</a></td
					></tr
				>
			{/each}
			<tr
				class="after:content-['+'] after:text-3xl after:absolute after:right-0 after:top-[50%] after:-translate-y-[50%] after:px-4  after:bg-slate-100 after:text-slate-600 after:rounded-md after:ring-offset-2 after:active:ring  after:border-2 after:border-slate-100 after:hover:border-slate-200 relative"
			>
				<td class="p-1">
					<input class="p-2" placeholder="enter..." />
				</td>
				<td class="p-1">
					<input class="p-2" placeholder="enter..." />
				</td>
				<td class="p-1">
					<input class="p-2" placeholder="enter..." />
				</td>
			</tr>
		</tbody>
	</table>
</main>

<footer>footer</footer>

<style>
	td,
	th {
		@apply text-left border-y p-3;
	}
</style>
