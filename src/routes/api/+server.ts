import type { RequestEvent } from "./$types";
import prisma from "$lib/prisma-client";
import  type {Company } from "@prisma/client";

export async function GET({ url }: RequestEvent): Promise<Response> {
    const id = url.searchParams.get("id") ?? -1

    if (id == -1) {
        const companies = await prisma.company.findMany();

        return new Response(
            JSON.stringify(companies),
            {
				headers: { 'content-type': 'application/json' }
            }
        );
    }

    const company = await prisma.company.findFirst({where:{id}})

    if (company == null) return new Response("Not Found", { status: 404 })
    
    return new Response(JSON.stringify(company), {
			headers: { 'content-type': 'application/json' }
		});
}

export async function POST({ request }: RequestEvent): Promise<Response> {
    try {
        const body: Company = await request.json();

        const company = await prisma.company.create({ data: { ...body, id: undefined } });

        return new Response(JSON.stringify(company), {
					headers: { 'content-type': 'application/json' }
				});
    } catch (error) {
        console.log(error)
        return new Response("ups, something went wrong",{status:400});
    }
}

export async function PUT({ request }: RequestEvent): Promise<Response> {
	try {
        const body: Company[] | Company  = await request.json();
        
        const companies = [];
        if (Array.isArray(body)) {
            for (const company of body) {
                companies.push(await prisma.company.update({ data: {...company, id:undefined}, where: { id: company.id } }));
            }
           
        } else {
            companies.push(await prisma.company.update({ data: {...body, id:undefined}, where: { id: body.id } }));
        }

		return new Response(JSON.stringify(companies), {
			headers: { 'content-type': 'application/json' }
		});
	} catch (error) {
		console.log(error);
		return new Response('ups, something went wrong', { status: 400 });
	}
}