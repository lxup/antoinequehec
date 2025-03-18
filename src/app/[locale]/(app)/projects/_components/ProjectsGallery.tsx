'use client';

import React from "react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import { Dialog } from "@radix-ui/react-dialog";
import { useParams } from "next/navigation";
import { motion } from "framer-motion"
import { Data, StrapiResponse } from "@/types/type.db";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStrapiData } from "@/lib/strapi/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
 
interface ProjectsGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
	data: StrapiResponse;
}

const ProjectsGallery = ({
	children,
	data
} : ProjectsGalleryProps) => {
	const t = useTranslations('common');
	const params = useParams();
	const pathname = usePathname();
	const router = useRouter();
	const isOpen = pathname !== '/Projects';
	const {
		data: images,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['projects'],
		queryFn: async ({ pageParam = 1 }) => {
			const res = await getStrapiData(`/projects?pagination[page]=${pageParam}&pagination[pageSize]=${data.meta.pagination.pageSize}&sort=updatedAt:desc&populate=*`);
			return res;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const { meta } = lastPage;
			const currentPage = meta.pagination.page;
			const totalPages = meta.pagination.pageCount;
			return currentPage < totalPages ? currentPage + 1 : undefined;
			// return lastPage?.length == perPage ? pages.length + 1 : undefined;
		},
		initialData: () => {
			return {
				pages: [data],
				pageParams: [1],
			}
		},
	})
	const handleOpenChange = (state: boolean) => {
		if (!state) {
			router.push('/projects', {
				scroll: false,
			});
		}
	};
	const [currentImage, setCurrentImage] = React.useState<string | null | undefined>(
		isOpen ? (params.image_id ? String(params.image_id) : null) : undefined
	)

	return (
	<div className="flex flex-col gap-2 p-2">
		<h1 className="text-center text-6xl font-bold">{t('projects')}</h1>
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			{children}
			<InfiniteScroll
				dataLength={images.pages.map(({ data: page }) => page.length).reduce((a, b) => a + b, 0)}
				next={fetchNextPage}
				hasMore={hasNextPage}
				loader={<></>}
			>
				<ResponsiveMasonry
				columnsCountBreakPoints={{ 300: 1, 500: 2, 900: 3, 1280: 4 }}
				>
					<Masonry gutter="20px">
						{images.pages.map(({ data: page }) => (
							page.map((item: Data, index: number) => {
								const handleClick = () => {
									setCurrentImage(item.documentId);
									router.push(`/projects/${item.documentId}`, {
										scroll: false,
									});
								};
								return (
									<motion.div
									key={index}
									onClick={handleClick}
									layoutId={`project-cover-${item.cover.id}`}
									className={`
										realtive flex mb-2 cursor-pointer w-full
										${currentImage === item.cover.id ? 'relative z-1' : ''}
									`}
									>
										<ImageWithFallback
										src={getStrapiMediaUrl(item.cover.url)}
										alt={item.cover.alternativeText ?? ''}
										className="w-full object-cover"
										width={400}
										height={400}
										/>
									</motion.div>
								)
							})
						))}
					</Masonry>
				</ResponsiveMasonry>
			</InfiniteScroll>
		</Dialog>
	</div>
	);
};

export default ProjectsGallery;
  