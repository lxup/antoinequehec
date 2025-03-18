import { redirect } from "next/navigation";
import ImageViewer from "./_components/ImageViewer";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";
import { getStrapiData } from "@/lib/strapi/actions";

const Image = async (
	props: {
		params: Promise<{
			image_id: string;
		}>;
	}
) => {
	const { image_id } = await props.params;
	if (!image_id) redirect('/gallery');
	const { data } = await getStrapiData(`/galleries/${image_id}?populate=*`);
	if (!data) redirect('/gallery');
	const image = data;
	return (
		<ImageViewer
		image={{
			id: image.image.id,
			src: getStrapiMediaUrl(image.image.url),
			alt: image.imagealternativeText ?? '',
		}}
		description={image.description}
		/>
	)
};

export default Image;