import { site } from '@/constants/site';
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
    title: t('metadata.title', { app: site.title }),
    description: t('metadata.description', { app: site.title }),
  };
}

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout = async ({ children }: ProjectsLayoutProps) => {
  const data = await getStrapiData('/projects?sort=updatedAt:desc&populate=*');
  return (
      <ProjectsGallery data={data}>
        {children}
      </ProjectsGallery>
  );
};

export default ProjectsLayout;
