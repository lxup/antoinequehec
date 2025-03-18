import { redirect } from "next/navigation";
import { getStrapiData } from "@/lib/strapi/actions";
import Project from "./_components/Project";

const ProjectPage = async (
	props: {
		params: Promise<{
			project_slug: string;
		}>;
	}
) => {
	const { project_slug } = await props.params;
	if (!project_slug) redirect('/projects');
	const { data } = await getStrapiData(`/projects?filters\[slug\][$eq]=${project_slug}&populate=*`);
	if (!data || !data.length) redirect('/projects');
	const project = data[0];
	return (
		<Project
		project={project}
		/>
	)
};

export default ProjectPage;