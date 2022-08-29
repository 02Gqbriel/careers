<script lang="ts">
	import type { PageData } from './$types';
	import { Status, type Company } from '@prisma/client';
	import throttle from '@jcoreio/async-throttle';

	import '$lib/base.css';
	import '$lib/variants.css';
	import '$lib/utilities.css';
	import '$lib/components.css';
	import { onMount } from 'svelte';

	export let data: PageData;
	let load = false;

	let new_company: Company = {
		id: '',
		name: '',
		mail: null,
		url: null,
		contact_person: [],
		status: 'WRITING',
		last_change: Date.now(),
		rating: 1,
		notes: ''
	};

	let username = '',
		password = '';

	let arr = [null, null, null, null, null];
	let times = [
		...data.companies.map((v) => calcTime(v.last_change)),
		calcTime(new_company.last_change)
	];

	onMount(() => {
		load = true;
	});

	$: console.log(data.companies),
		throttle(async () => {
			if (load) {
				await fetch('/api', {
					method: 'PUT',
					body: JSON.stringify(data.companies)
				});
			}
		}, 6000)();

	$: new_company = { ...new_company, last_change: Date.now() };

	setInterval(() => {
		times = [
			...data.companies.map((v, i) => calcTime(data.companies[i].last_change)),
			calcTime(new_company.last_change)
		];
	}, 1000);

	function calcTime(time: number) {
		var diff = Date.now() - time;

		var daysDifference = Math.floor(diff / 1000 / 60 / 60 / 24);
		diff -= daysDifference * 1000 * 60 * 60 * 24;

		var hoursDifference = Math.floor(diff / 1000 / 60 / 60);
		diff -= hoursDifference * 1000 * 60 * 60;

		var minutesDifference = Math.floor(diff / 1000 / 60);
		diff -= minutesDifference * 1000 * 60;

		var secondsDifference = Math.floor(diff / 1000);

		var leadingZero = (time: number) => (time < 10 ? '0' + time : time);

		return `${leadingZero(daysDifference)}:${leadingZero(hoursDifference)}:${leadingZero(
			minutesDifference
		)}:${leadingZero(secondsDifference)}`;
	}

	async function addCompany() {
		const input = document.querySelectorAll('input')[0];

		if (input.value.length === 0) return alert('please enter name');

		const res = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify(new_company)
		});

		if (res.ok) {
			const res = await fetch('/api');
			data.companies = await res.json();
		}
	}
</script>

<header>
	<h1>Carreers</h1>
</header>

<main class="grow">
	<table class="table-auto border-collapse w-full text-sm">
		<thead>
			<tr>
				<th>name:</th>
				<th>notes:</th>
				<th>mail:</th>
				<th>url:</th>
				<th>rating:</th>
				<th>status:</th>
				<th>last activity</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each data.companies as company, i}
				<tr>
					<td class="p-1">
						<input bind:value={company.name} type="text" placeholder="enter..." />
					</td>
					<td class="p-1">
						<input bind:value={company.notes} type="text" placeholder="enter..." />
					</td>
					<td class="p-1">
						<input
							bind:value={company.mail}
							type="email"
							pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{(2, 4)}$'}
							autocomplete="email"
							placeholder="enter..."
						/>
					</td>
					<td class="p-1">
						<input bind:value={company.url} type="text" placeholder="enter..." />
					</td>
					<td class="p-1 ">
						<span class="flex justify-around">
							{#each arr as s, index}
								{#if index + 1 <= company.rating}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-7 h-7 mx-0.5"
										on:click={() => {
											company.rating = index + 1;
										}}
									>
										<path
											fill-rule="evenodd"
											d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
											clip-rule="evenodd"
										/>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-7 h-7 mx-0.5"
										on:click={() => {
											company.rating = index + 1;
										}}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
										/>
									</svg>
								{/if}
							{/each}
						</span>
					</td>
					<td class="p-1">
						<select name="statusSelect" id="statusSelect" bind:value={company.status}>
							<option value={Status.ANSWERED}> answered</option>
							<option value={Status.APPLIED}> applied</option>
							<option value={Status.INVITED}> invited</option>
							<option value={Status.OFFER}> offer</option>
							<option value={Status.REJECTED}> refected</option>
							<option value={Status.WRITING}> writing</option>
						</select>
					</td>
					<td class="p-1">
						<span class="ml-1 text-base font-mono">
							{times[i]}
						</span>
					</td>
					<td />
				</tr>
			{/each}

			<tr class="relative lg:table-row hidden">
				<td class="p-1">
					<input bind:value={new_company.name} type="text" placeholder="enter..." />
				</td>
				<td class="p-1">
					<input bind:value={new_company.notes} type="text" placeholder="enter..." />
				</td>
				<td class="p-1">
					<input
						bind:value={new_company.mail}
						type="email"
						pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{(2, 4)}$'}
						autocomplete="email"
						placeholder="enter..."
					/>
				</td>
				<td class="p-1">
					<input bind:value={new_company.url} type="text" placeholder="enter..." />
				</td>
				<td class="p-1 ">
					<span class="flex justify-around">
						{#each arr as s, i}
							{#if i + 1 <= new_company.rating}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-7 h-7 mx-0.5"
									on:click={() => (new_company.rating = i + 1)}
								>
									<path
										fill-rule="evenodd"
										d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
										clip-rule="evenodd"
									/>
								</svg>
							{:else}<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-7 h-7 mx-0.5"
									on:click={() => (new_company.rating = i + 1)}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
									/>
								</svg>
							{/if}
						{/each}
					</span>
				</td>
				<td class="p-1">
					<select name="statusSelect" id="statusSelect" bind:value={new_company.status}>
						<option value={Status.ANSWERED}> answered</option>
						<option value={Status.APPLIED}> applied</option>
						<option value={Status.INVITED}> invited</option>
						<option value={Status.OFFER}> offer</option>
						<option value={Status.REJECTED}> refected</option>
						<option value={Status.WRITING}> writing</option>
					</select>
				</td>
				<td class="p-1">
					<span class="ml-1 text-base font-mono">
						{times[data.companies.length]}
					</span>
				</td>
				<td>
					<button class="flex justify-center items-center" on:click={addCompany}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-12 h-8 fill-slate-600 bg-slate-100 float-right rounded hover:border-slate-200 border-2 active:ring-2 ring-offset-1 border-slate-100"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</main>

<footer>footer</footer>

<style>
	td,
	th {
		@apply text-left border-y p-2;
	}

	input,
	select {
		@apply w-full py-1 rounded font-semibold px-1.5 border-none bg-slate-100 overflow-ellipsis;
	}

	select {
		@apply mr-8;
	}
</style>
