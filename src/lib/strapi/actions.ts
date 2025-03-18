'use server';

const getStrapiData = async (path: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
	try {
		const res = await fetch(`${baseUrl}/api${path.startsWith('/') ? path : `/${path}`}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export {
	getStrapiData,
};