import Header from "@/components/Header";
import { getGlobal } from "@/features/server";

const AppLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
	const { data } = await getGlobal();
	return (
	<div className="min-h-screen flex">
		<main className="flex flex-1 flex-col">
			<Header siteName={data.siteName} />
			{children}
		</main>
	</div>
	);
};

export default AppLayout;
