'use client';
import { Data } from "@/types/type.db";
import ProjectViewer from "./ProjectViewer";

const Project = ({
	project,
} : {
	project: Data;
}) => {
	return (
	<div className="flex flex-col items-center p-2">
		<h1 className="text-center text-6xl font-bold">{project.title}</h1>
		<ProjectViewer type={project.type} media_url={project.media_url} />
		<div className="max-w-xl">
			<p className="text-muted-foreground italic">
				{project.date ? new Date(project.date).getFullYear() : null}
				{project.genre ? ` | ${project.genre}` : null}
				{project.duration ? ` | ${Math.floor(project.duration / 60)}'${project.duration % 60}` : null}
			</p>
			{project.production ? <h4 className="text-muted-foreground">{project.production}</h4> : null}
			{project.description ? <p>{project.description}</p> : null}
		</div>
	</div>
	)
};

export default Project;