'use client';
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/lib/i18n/routing";
import { site } from "@/constants/site";
import { useTranslations } from "next-intl";
import { Fragment, useMemo, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { Button } from "./ui/button";
import { upperFirst } from "lodash";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Header = ({
	className,	
} : {
	className?: string;
}) => {
	const pathname = usePathname();
	const t = useTranslations('common');
	const [ open, setOpen ] = useState(false);
	const routes = useMemo(() => ([
		{
			name: t('projects'),
			href: 'projects',
			active: pathname.startsWith('/projects'),
		},
		{
			name: t('gallery'),
			href: 'gallery',
			active: pathname.startsWith('/gallery'),
		},
		{
			name: t('contact'),
			href: 'contact',
			active: pathname.startsWith('/contact'),
		}
	]), [t, pathname]);
	// const router = useTransitionRouter();
	// const slideInOut = () => {
	// 	document.documentElement.animate(
	// 		[
	// 			{
	// 				opacity: 1,
	// 				transform: 'translateY(0)',
	// 			},
	// 			{
	// 				opacity: 0.2,
	// 				transform: 'translateY(-35%)',
	// 			},
	// 		], {
	// 			duration: 750,
	// 			easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
	// 			fill: 'forwards',
	// 			pseudoElement: "::view-transition-old(root)",
	// 		}
	// 	);

	// 	document.documentElement.animate(
	// 		[
	// 			{
	// 				clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
	// 			},
	// 			{
	// 				clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
	// 			}
	// 		], {
	// 			duration: 750,
	// 			easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
	// 			fill: 'forwards',
	// 			pseudoElement: "::view-transition-new(root)",
	// 		}
	// 	)

	// };
	return (
		<header className={cn("flex justify-between items-center w-full p-2 bg-background", className)}>
			<Link
			href={'/'}
			className="font-bold text-lg"
			// onClick={(e) => {
			// 	e.preventDefault();
			// 	if (pathname !== '/') {
			// 		router.push('/', {
			// 			onTransitionReady: slideInOut,
			// 		});
			// 	}
			// }}
			>
				{site.title}
			</Link>
			<div className="hidden md:flex items-center gap-1">
				{routes.map((route, index) => (
					<Fragment key={index}>
						<Button variant={'link'} className="text-xl" asChild>
							<Link
							href={route.href}
							// onClick={(e) => {
							// 	e.preventDefault();
							// 	router.push(route.href, {
							// 		onTransitionReady: slideInOut,
							// 	});
							// }}
							>
								{upperFirst(route.name)}
							</Link>
						</Button>
						{index < routes.length - 1 && <span className="text-xl">/</span>}
					</Fragment>
				))}
			</div>
			<div className="md:hidden">
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button variant="link">
							<MenuIcon className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
						<SheetTitle>{site.title}</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-2 p-4">
							{routes.map((route, index) => (
								<Fragment key={index}>
									<Link
									href={route.href}
									className="font-semibold text-lg"
									onClick={() => setOpen(false)}
									>
										{upperFirst(route.name)}
									</Link>
								</Fragment>
							))}
						</div>
						<SheetFooter>
				
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		{/* 
			<div className="flex items-center gap-2">
				<button>
					<MenuIcon className="h-6 w-6" />
					<span className="sr-only">Menu</span>
				</button>
			</div> */}
		</header>
	)
};

export default Header;