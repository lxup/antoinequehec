import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import React from 'react';
import ReactPlayer from 'react-player';

interface ProjectViewerProps {
	media_url?: string;
	type: string;
}

const ProjectViewer = ({
	media_url,
	type
} : ProjectViewerProps) => {
	const t = useTranslations('common');
	if (!media_url) return null;
	switch (type) {
		case 'video':
			return (
				<ReactPlayer
				url={media_url}
				controls
				width={'100%'}
				style={{
					maxWidth: '768px',
				}}
				/>
			)
		case 'sound':
			return (
				<ReactPlayer
				url={media_url}
				controls
				width={'100%'}
				height={'50px'}
				style={{
					maxWidth: '768px',
				}}
				/>
			)
		case 'writing':
			return (
				<Button>
					<Link href={media_url} target="_blank">
						{t('download')}
					</Link>
				</Button>
			)
		default:
			return null;
	}
};
export default ProjectViewer;
