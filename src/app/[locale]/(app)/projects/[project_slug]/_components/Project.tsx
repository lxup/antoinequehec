'use client';
import { type Project } from "@/types/type.db";
import ProjectViewer from "./ProjectViewer";
import { Separator } from "@/components/ui/separator";

const Project = ({
	project,
} : {
	project: Project;
}) => {
	return (
	<div className="flex flex-col items-center p-2">
		<h1 className="text-center text-6xl font-bold">{project.title}</h1>
		<ProjectViewer type={project.type} media_url={project.media_url} />
		<div className="max-w-xl flex flex-col gap-2">
			<p className="text-muted-foreground italic">
				{project.date ? new Date(project.date).getFullYear() : null}
				{project.genre ? ` | ${project.genre}` : null}
				{project.duration ? ` | ${Math.floor(project.duration / 60)}'${project.duration % 60}` : null}
			</p>
			{project.job ? <h4 className="text-muted-foreground">{project.job}</h4> : null}
			{project.production ? <h4 className="text-muted-foreground">{project.production}</h4> : null}
			<Separator />
			{project.description ? <p>{project.description}</p> : null}
		</div>
	</div>
	)
};

export default Project;