import type {Company} from "@prisma/client"
import { error } from "@sveltejs/kit";
import type {PageLoadEvent} from "./$types"

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }:PageLoadEvent) {
	const companies = await fetch("/api");

	if (!companies.ok) {
		throw error(400, "ups, something went wrong");
	}
	const data: Company[] = await companies.json()

	return {
		companies: data,
	}
}
