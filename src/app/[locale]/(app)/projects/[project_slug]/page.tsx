import { redirect } from "next/navigation";
import Project from "./_components/Project";
import { getProject } from "@/features/server";

export async function generateMetadata(
	props: {
		params: Promise<{
			project_slug: string;
		}>;
	}
) {
	const { project_slug } = await props.params;
	if (!project_slug) redirect('/projects');
	const { data } = await getProject(project_slug);
	if (!data) redirect('/projects');
	return {
	  title: data.title,
	  description: data.description,
	};
}

const ProjectPage = async (
	props: {
		params: Promise<{
			project_slug: string;
		}>;
	}
) => {
	const { project_slug } = await props.params;
	if (!project_slug) redirect('/projects');
	const { data } = await getProject(project_slug);
	if (!data) redirect('/projects');
	return (
		<Project
		project={data}
		/>
	)
};

export default ProjectPage;