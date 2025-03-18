'use client';
import { Button } from "@/components/ui/button";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";
import { Media } from "@/types/type.db";
import { Volume2Icon, VolumeOffIcon } from "lucide-react";
import React from "react";

interface ShowreelProps extends React.HTMLAttributes<HTMLVideoElement> {
	video: Media;
}

const Showreel = ({
	video,
} : ShowreelProps) => {
	const [muted, setMuted] = React.useState(true);
	return (
		<>
			<video
			autoPlay
			muted={muted}
			loop
			className="absolute top-0 w-full h-full object-cover -z-10"
			>
				<source src={getStrapiMediaUrl(video.url)} type={video.mime} />
			</video>
			<div className="absolute -z-10 w-full h-1/3 bg-gradient-to-b from-background/70 to-transparent/" />
			<Button value={'ghost'} size={'icon'}  className="absolute bottom-2 right-2 rounded-full" onClick={() => setMuted((prev) => !prev)}>
				{muted ? <VolumeOffIcon /> : <Volume2Icon />}
			</Button>
		</>
	)
};

export default Showreel;