import type { RequestEvent } from "@sveltejs/kit";
import pkg from 'bcryptjs';
const { hash, genSalt } = pkg;
import 'dotenv/config';

export async function GET({ url }: RequestEvent): Promise<Response> {
    const pswd = process.env.PASSWORD ?? -1;

    if(pswd == -1) return new Response("Ups something went wrong")
	
    return new Response(await hash(pswd, await genSalt()), {
		headers: { 'content-type': 'application/json' }
	});
}
