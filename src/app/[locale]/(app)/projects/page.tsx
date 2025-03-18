import { getTranslations } from 'next-intl/server';
import ProjectsGallery from './_components/ProjectsGallery';
import { getStrapiData } from '@/lib/strapi/actions';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.projects' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

const Projects = async () => {
  const data = await getStrapiData('/projects?sort=updatedAt:desc&populate=*');
  return (
      <ProjectsGallery data={data} />
  );
};

export default Projects;
