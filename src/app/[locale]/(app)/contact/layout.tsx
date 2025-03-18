import { site } from '@/constants/site';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.contact' });
  return {
    title: t('metadata.title', { app: site.title }),
    description: t('metadata.description', { app: site.title }),
  };
}

interface ContactLayoutProps {
  children: React.ReactNode;
}

const ContactLayout = async ({ children }: ContactLayoutProps) => {
  return children;
};

export default ContactLayout;
