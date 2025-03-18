
import { getStrapiData } from "@/lib/strapi/actions";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";

const Home = async () => {
	const home = await getStrapiData('/home?populate=*');
	return (
	<div className="h-full flex flex-col items-center justify-center gap-2 pb-[44px]">
		<video
		autoPlay
		muted
		loop
		className="absolute top-0 w-full h-full object-cover -z-10"
		>
			<source src={getStrapiMediaUrl(home.data.showreel.url)} type="video/mp4" />
		</video>
	</div>
	);
};

export default Home;
  