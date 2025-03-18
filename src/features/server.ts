import { getStrapiData } from "@/lib/strapi/actions";
import { cache } from "react";

export const getGlobal = cache(async () => {
	const res = await getStrapiData('/global?populate=*');
	return res;
});