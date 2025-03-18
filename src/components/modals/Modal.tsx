import * as React from "react"
 
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useUI } from "@/provider/ui-provider";

export interface ModalType {
	id: string;
	open: boolean;
}

/**
 * Modal component
 * @param children
 * @return on desktop: Dialog, on mobile: Drawer
 */
const Modal = ({
	children,
	className,
	...props
}: React.ComponentProps<typeof Dialog> & { className?: string }) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<Dialog {...props}>
			<ModalContent className={cn('', className)}>
				{children}
			</ModalContent>
		</Dialog>
	) : (
		<Drawer {...props}>
			<ModalContent className={cn('', className)}>
				{children}
			</ModalContent>
		</Drawer>
	);
}

/**
 * Modal content component
 * @param children
 * @return on desktop: DialogContent, on mobile: DrawerContent
 */
const ModalContent = React.forwardRef<
	React.ElementRef<typeof DialogContent>,
	React.ComponentPropsWithoutRef<typeof DrawerContent>
>(({ className, ...props }, ref) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<DialogContent
			ref={ref}
			className={cn('max-h-[80%] overflow-auto', className)}
			{...props}
		/>
	) : (
		<DrawerContent
			ref={ref}
			className={cn('max-h-[95%]', className)}
			{...props}
		/>
	);
});
ModalContent.displayName = 'ModalContent';

const ModalBody = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<div className={cn('', className)} {...props} />
	) : (
		<div className={cn('p-4 overflow-auto', className)} {...props} />
	);
};
ModalBody.displayName = 'ModalBody';

/**
 * Modal header component
 * @param children
 * @return on desktop: DialogHeader, on mobile: DrawerHeader
 */
const ModalHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<DialogHeader
			className={cn('', className)}
			{...props}
		/>
	) : (
		<DrawerHeader
			className={cn('', className)}
			{...props}
		/>
	);
};
ModalHeader.displayName = 'ModalHeader';

/**
 * Modal footer component
 * @param children
 * @return on desktop: DialogFooter, on mobile: DrawerFooter
 */
const ModalFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<DialogFooter
			className={cn('', className)}
			{...props}
		/>
	) : (
		<DrawerFooter
			className={cn('pt-2', className)}
			{...props}
		/>
	);
};
ModalFooter.displayName = 'ModalFooter';

/**
 * Modal title component
 * @param children
 * @return On desktop: DialogTitle, On mobile: DrawerTitle
 */
const ModalTitle = React.forwardRef<
	React.ElementRef<typeof DialogTitle>,
	React.ComponentPropsWithoutRef<typeof DrawerTitle>
>(({ className, ...props }, ref) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<DialogTitle
			ref={ref}
			className={cn('', className)}
			{...props}
		/>
	) : (
		<DrawerTitle
			ref={ref}
			className={cn('', className)}
			{...props}
		/>
	);
});
ModalTitle.displayName = 'ModalTitle';

/**
 * Modal description component
 * @param children
 * @return On desktop: DialogDescription, On mobile: DrawerDescription
 */
const ModalDescription = React.forwardRef<
	React.ElementRef<typeof DialogDescription>,
	React.ComponentPropsWithoutRef<typeof DrawerDescription>
>(({ className, ...props }, ref) => {
	const { device } = useUI();
	return device === 'desktop' ? (
		<DialogDescription
			ref={ref}
			className={cn('', className)}
			{...props}
		/>
	) : (
		<DrawerDescription
			ref={ref}
			className={cn('', className)}
			{...props}
		/>
	);
});
ModalDescription.displayName = 'ModalDescription';




export {
	Modal,
	// ModalPortal
	// ModalOverlay,
	// ModalTrigger,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalTitle,
	ModalDescription,
}