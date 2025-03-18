import Header from "@/components/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	return (
	<div className="min-h-screen flex">
		<main className="flex flex-1 flex-col">
			<Header />
			{children}
		</main>
	</div>
	);
}
