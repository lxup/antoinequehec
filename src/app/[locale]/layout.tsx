import "@/styles/globals.css";
import { Courier_Prime } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getFallbackLanguage } from "@/lib/i18n/fallback";
import deepmerge from "deepmerge";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from 'nextjs-toploader';
import { ModalProvider } from "@/provider/modal-provider";
import { UIProvider } from "@/provider/ui-provider";
import { ViewTransitions } from 'next-view-transitions';
import { ReactQueryProvider } from "@/provider/react-query-provider";
import { getGlobal } from "@/features/server";
import { Metadata } from "next";
import { getStrapiMediaUrl } from "@/lib/strapi/strapi";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getGlobal();
  return {
    title: {
      default: data.defaultSeo.metaTitle,
      template: `%s | ${data.siteName}`,
    },
    description: data.defaultSeo.metaDescription,
    icons: {
      icon: getStrapiMediaUrl(data.favicon.url),
    }
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
	// NEXT-INTL
	const userMessages = await getMessages({ locale });
	const fallbackMessages = await getMessages({ locale: getFallbackLanguage({ locale }) });
	const messages = deepmerge(fallbackMessages, userMessages);
	return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning>
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={`${courierPrime.className} antialiased`}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={true}
            >
              <ReactQueryProvider>
                <UIProvider>
                  <TooltipProvider delayDuration={100}>
                    <ModalProvider>
                      <NextTopLoader
                        showSpinner={false}
                        easing="ease"
                        color="#FFE974"
                        height={2}
                      />
                      <Toaster
                        position="top-center"
                        toastOptions={{
                          style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                          },
                        }}
                      />
                      {children}
                    </ModalProvider>
                  </TooltipProvider>
                </UIProvider>
              </ReactQueryProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
	);
}
