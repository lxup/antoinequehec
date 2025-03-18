import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales } from './locales';
 
export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'fr',
  localePrefix: 'never',
});
 
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);