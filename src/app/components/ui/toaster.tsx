import { CircleAlert, CircleCheck, CircleX } from "lucide-react";
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, variant, ...props }) => (
				<Toast key={id} {...props} variant={variant}>
					<div className="grid gap-1">
						{title && (
							<ToastTitle className="flex gap-4 items-center">
								{(!variant || variant === "default") && (
									<CircleAlert className="h-8 w-8 text-zinc-900" />
								)}
								{variant === "destructive" && (
									<CircleX className="h-8 w-8 text-red-500" />
								)}
								{variant === "success" && (
									<CircleCheck className="h-8 w-8 text-green-500" />
								)}
								{title}
							</ToastTitle>
						)}
						{description && <ToastDescription>{description}</ToastDescription>}
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	);
}
