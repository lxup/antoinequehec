import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { getStrapiData } from "@/lib/strapi/actions";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";
import { BookIcon, FileUserIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const Contact = async (
	props: {
		params: Promise<{
			lang: string;
		}>;
	}
) => {
	const { lang } = await props.params;
	const t = await getTranslations({ locale: lang, namespace: 'common' });
	const res = await getStrapiData('/contact?populate=*');
	if (!res) notFound();
	const { data } = res;
	return (
		<div className="flex flex-col p-2 gap-4">
			<p className="max-w-xl">{data.description}</p>
			{data.book || data.cv ? (
				<div className="flex gap-2 items-center">
					{data.book ? (
						<Button className="w-fit" asChild>
							<Link href={getStrapiMediaUrl(data.book.url)} target="_blank" download>
								<BookIcon className="w-6 h-6" />
								{t('book')}
							</Link>
						</Button>
					) : null}
					{data.cv ? (
						<Button className="w-fit" asChild>
							<Link href={getStrapiMediaUrl(data.cv.url)} target="_blank" download>
								<FileUserIcon className="w-6 h-6" />
								{t('cv')}
							</Link>
						</Button>
					) : null}
				</div>
			) : null}
			<div className="flex flex-col border-2 border-foreground w-fit p-2">
				<h2 className="font-bold text-xl">{t('contact')}</h2>
				<p>{data.full_name}</p>
				<Link className="hover:underline underline-offset-2" href={`tel:${data.contact_phone}`}>{data.contact_phone}</Link>
				<Link className="hover:underline underline-offset-2" href={`mailto:${data.contact_email}`}>{data.contact_email}</Link>
			</div>
		</div>
	);
}

export default Contact;