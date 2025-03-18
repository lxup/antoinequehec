import { getStrapiData } from "@/lib/strapi/actions";
import { cache } from "react";

export const getGlobal = cache(async () => {
	const res = await getStrapiData('/global?populate=*');
	return res;
});

export const getProject = cache(async (slug: string) => {
	const res = await getStrapiData(`/projects?filters\[slug\][$eq]=${slug}&populate=*`);
	return {
		meta: res.meta,
		data: res.data ? res.data[0] : null
	};
});