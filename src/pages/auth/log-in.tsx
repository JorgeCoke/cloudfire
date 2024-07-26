import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Github } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactLogo from "../../assets/react.svg";
import { Button } from "../../components/custom/button";
import { PasswordInput } from "../../components/custom/password-input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Please enter your email" })
		.email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(1, {
			message: "Please enter your password",
		})
		.min(7, {
			message: "Password must be at least 7 characters long",
		}),
});

export default function LogInPage() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);
		console.log(data);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mr-2 h-6 w-6"
					>
						<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
					</svg>
					Shadcn Admin
				</div>

				<img
					src={ReactLogo}
					className="relative m-auto"
					width={301}
					height={60}
					alt="Vite"
				/>

				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;This library has saved me countless hours of work and
							helped me deliver stunning designs to my clients faster than ever
							before.&rdquo;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-left">
						<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email and password below <br />
							to log into your account
						</p>
					</div>
					<div className={cn("grid gap-6")}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder="name@example.com" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<div className="flex items-center justify-between">
													<FormLabel>Password</FormLabel>
													<a
														href="/forgot-password"
														className="text-sm font-medium text-muted-foreground hover:opacity-75"
													>
														Forgot password?
													</a>
												</div>
												<FormControl>
													<PasswordInput placeholder="********" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button className="mt-2" loading={isLoading}>
										Login
									</Button>

									<div className="relative my-2">
										<div className="absolute inset-0 flex items-center">
											<span className="w-full border-t" />
										</div>
										<div className="relative flex justify-center text-xs uppercase">
											<span className="bg-background px-2 text-muted-foreground">
												Or continue with
											</span>
										</div>
									</div>

									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											className="w-full"
											type="button"
											loading={isLoading}
											leftSection={<Github className="h-4 w-4" />}
										>
											GitHub
										</Button>
										<Button
											variant="outline"
											className="w-full"
											type="button"
											loading={isLoading}
											leftSection={<Facebook className="h-4 w-4" />}
										>
											Facebook
										</Button>
									</div>
								</div>
							</form>
						</Form>
					</div>{" "}
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking login, you agree to our{" "}
						<a
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
