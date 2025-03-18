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
 

interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
	data: StrapiResponse;
}

const Gallery = ({
	children,
	data
} : GalleryProps) => {
	const t = useTranslations('common');
	const params = useParams();
	const pathname = usePathname();
	const router = useRouter();
	const isOpen = pathname !== '/gallery';
	const {
		data: images,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['galleries'],
		queryFn: async ({ pageParam = 1 }) => {
			const res = await getStrapiData(`/galleries?pagination[page]=${pageParam}&pagination[pageSize]=${data.meta.pagination.pageSize}&sort=updatedAt:desc&populate=*`);
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
			router.push('/gallery', {
				scroll: false,
			});
		}
	};
	const [currentImage, setCurrentImage] = React.useState<string | null | undefined>(
		isOpen ? (params.image_id ? String(params.image_id) : null) : undefined
	)

	return (
	<div className="flex flex-col gap-2 p-2">
		<h1 className="text-center text-6xl font-bold">{t('gallery')}</h1>
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			{children}
			<InfiniteScroll
				dataLength={images.pages.map(({ data: page }) => page.length).reduce((a, b) => a + b, 0)}
				next={fetchNextPage}
				hasMore={hasNextPage}
				loader={<></>}
			>
				<ResponsiveMasonry
				columnsCountBreakPoints={{ 0: 1, 300: 2, 500: 3, 700: 4, 900: 5 }}
				>
					<Masonry gutter="20px">
					{images.pages.map(({ data: page }) => (
						page.map((item: Data, index: number) => {
							const handleClick = () => {
								setCurrentImage(item.documentId);
								router.push(`/gallery/${item.documentId}`, {
									scroll: false,
								});
							};
							return (
								<motion.div
								key={index}
								onClick={handleClick}
								layoutId={`image-${item.image.id}`}
								className={`
									relative flex cursor-pointer
									${currentImage === item.image.id ? 'relative z-1' : ''}
								`}
								>
									<ImageWithFallback
									src={getStrapiMediaUrl(item.image.url)}
									alt={item.image.alternativeText ?? ''}
									className="w-full object-cover"
									width={1000}
									height={1000}
									sizes={`
										(max-width: 640px) 500px,
										(max-width: 1024px) 800px,
										1000px
									`}
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

export default Gallery;
  