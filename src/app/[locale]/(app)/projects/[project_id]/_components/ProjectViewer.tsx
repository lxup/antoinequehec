'use client';

import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "@/lib/i18n/routing";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";
import { Data } from "@/types/type.db";
import { DialogContent, DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";


const ProjectViewer = ({
	project,
} : {
	project: Data;
}) => {
	const router = useRouter();
	return (
		<DialogOverlay asChild key={`overlay-${project.id}`}>
			<motion.div className="z-10 fixed inset-0 bg-black/70 overflow-y-auto">
				<VisuallyHidden>
				<DialogTitle />
				</VisuallyHidden>
				<DialogContent forceMount asChild key={`content-${project.id}`}>
					<motion.div
					className="flex flex-col h-screen justify-center items-center"
					onClick={() => {
						router.push('/projects', {
							scroll: false
						});
					}}
					>
						<motion.div
						layoutId={`project-cover-${project.cover.id}`}
						className="relative w-full sm:w-md"
						onClick={(e) => e.stopPropagation()}>
							<ImageWithFallback
							src={getStrapiMediaUrl(project.cover.url)}
							alt={project.cover.alt ?? ''}
							className="w-full object-cover"
							width={400}
							height={400}
							/>
						</motion.div>
						{project.description ? <p className="text-foreground max-w-md text-justify">{project.description}</p> : null}
					</motion.div>
				</DialogContent>
			</motion.div>
		</DialogOverlay>
	)
};

export default ProjectViewer;