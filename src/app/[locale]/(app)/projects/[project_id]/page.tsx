import { redirect } from "next/navigation";
import { getStrapiData } from "@/lib/strapi/actions";
import ProjectViewer from "./_components/ProjectViewer";

const Project = async (
	props: {
		params: Promise<{
			project_id: string;
		}>;
	}
) => {
	const { project_id } = await props.params;
	if (!project_id) redirect('/projects');
	const { data } = await getStrapiData(`/projects/${project_id}?populate=*`);
	if (!data) redirect('/projects');
	const project = data;
	return (
		<ProjectViewer
		project={project}
		/>
	)
};

export default Project;