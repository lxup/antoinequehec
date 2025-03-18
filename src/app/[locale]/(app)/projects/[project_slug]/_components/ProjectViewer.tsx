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
	switch (type) {
		case 'video':
			if (!media_url) return null;
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
		default:
			return null;
	}
};
export default ProjectViewer;
