import { getTranslations } from 'next-intl/server';
import Gallery from './_components/Gallery';
import { getStrapiData } from '@/lib/strapi/actions';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.gallery' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

interface GalleryLayoutProps {
  children: React.ReactNode;
}

const GalleryLayout = async ({ children }: GalleryLayoutProps) => {
  const data = await getStrapiData('/galleries?sort=updatedAt:desc&populate=*');
  return (
      <Gallery data={data}>
        {children}
      </Gallery>
  );
};

export default GalleryLayout;
