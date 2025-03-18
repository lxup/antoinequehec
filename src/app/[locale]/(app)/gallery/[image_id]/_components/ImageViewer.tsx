'use client';

import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useRouter } from "@/lib/i18n/routing";
import { DialogContent, DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";


const ImageViewer = ({
	image,
	description
} : {
	image: {
		id: number;
		src: string;
		alt: string;
	}
	description: string;
}) => {
	const router = useRouter();
	return (
		<DialogOverlay asChild key={`overlay-${image.id}`}>
			<motion.div className="z-10 fixed inset-0 bg-black/70 overflow-y-auto">
				<VisuallyHidden>
				<DialogTitle />
				</VisuallyHidden>
				<DialogContent forceMount asChild key={`content-${image.id}`}>
					<motion.div
					className="flex flex-col h-screen justify-center items-center"
					onClick={() => {
						router.push('/gallery', {
							scroll: false
						});
					}}
					>
						<motion.div
						layoutId={`image-${image.id}`}
						className="relative w-full sm:w-md"
						onClick={(e) => e.stopPropagation()}>
							<ImageWithFallback
							src={image.src}
							alt={image.alt}
							className="w-full object-cover"
							width={400}
							height={400}
							/>
						</motion.div>
						{description ? <p className="text-secondary max-w-md text-justify">{description}</p> : null}
					</motion.div>
				</DialogContent>
			</motion.div>
		</DialogOverlay>
	)
};

export default ImageViewer;