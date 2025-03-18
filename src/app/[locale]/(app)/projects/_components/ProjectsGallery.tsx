'use client';

import React from "react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Link } from "@/lib/i18n/routing";
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
	data
} : ProjectsGalleryProps) => {
	const t = useTranslations('common');
	const {
		data: projects,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['projects'],
		queryFn: async ({ pageParam = 1 }) => {
			const res = await getStrapiData(`/projects?pagination[page]=${pageParam}&pagination[pageSize]=${data.meta.pagination.pageSize}&sort[0]=importance:desc&sort[1]=date:desc&populate=*`);
			return res;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const { meta } = lastPage;
			const currentPage = meta.pagination.page;
			const totalPages = meta.pagination.pageCount;
			return currentPage < totalPages ? currentPage + 1 : undefined;
		},
		initialData: () => {
			return {
				pages: [data],
				pageParams: [1],
			}
		},
	})

	return (
	<div className="flex flex-col gap-2 p-2">
		<h1 className="text-center text-6xl font-bold">{t('projects')}</h1>
		<InfiniteScroll
		dataLength={projects.pages.map(({ data: page }) => page.length).reduce((a, b) => a + b, 0)}
		next={fetchNextPage}
		hasMore={hasNextPage}
		loader={<></>}
		>
			<ResponsiveMasonry
			columnsCountBreakPoints={{ 300: 1, 500: 2, 900: 3, 1280: 4 }}
			>
				<Masonry gutter="20px">
					{projects.pages.map(({ data: page }) => (
						page.map((item: Data, index: number) => (
							<Link
							key={index}
							href={`/projects/${item.slug}`}
							className={`relative flex flex-col mb-2 cursor-pointer w-full
							`}
							>
								<ImageWithFallback
								src={getStrapiMediaUrl(item.cover?.url)}
								alt={item.cover?.alternativeText ?? ''}
								className="w-full object-cover"
								type={item.type}
								width={1000}
								height={1000}
								sizes={`
									(max-width: 640px) 500px,
									(max-width: 1024px) 800px,
									1000px
								`}
								/>
								<h3>
									{item.title}
								</h3>
							</Link>
						))
					))}
				</Masonry>
			</ResponsiveMasonry>
		</InfiniteScroll>
	</div>
	);
};

export default ProjectsGallery;
  