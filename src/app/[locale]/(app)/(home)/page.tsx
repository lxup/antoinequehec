
import { getStrapiData } from "@/lib/strapi/actions";
import Showreel from "./_components/Showreel";

const Home = async () => {
	const home = await getStrapiData('/home?populate=*');
	return (
		<Showreel video={home.data.showreel}
		/>
	);
};

export default Home;
  