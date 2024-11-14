import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { redirectPage } from "@nanostores/router";
import { Flame, MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PostSignupBodyDto } from "../../../server/routes/auth/auth.dtos";
import { AnchorButton, Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/form";
import { ROUTES, router } from "../../router";
import { $doSignup } from "../../services/auth.service";

export default function SignupPage() {
	const signup = useStore($doSignup);
	const { register, handleSubmit, formState } = useForm<PostSignupBodyDto>({
		resolver: zodResolver(PostSignupBodyDto),
	});

	return (
		<main className="w-full h-[100vh] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="hidden bg-neutral-950 lg:flex justify-center relative">
				<div className="bg-gradient-to-br from-primary/10 via-neutral-950 to-violet-950/50 w-full h-full absolute" />
				<div className="flex flex-col gap-4 items-center justify-center text-white text-3xl font-bold z-10">
					<Flame className="w-24 h-24 " />
					Cloudfire
				</div>
			</div>
			<div className="flex items-center justify-center py-12">
				<AnchorButton
					variant="ghost"
					href={ROUTES.HOME}
					className="flex gap-2 absolute right-4 top-4 md:right-8 md:top-8"
				>
					<MoveLeft className="w-4 h-4" />
					Homepage
				</AnchorButton>
				<div className="mx-auto grid w-[350px] gap-6 p-2">
					<div className="flex flex-col gap-4 text-center">
						<div className="flex lg:hidden justify-center py-6">
							<Flame className="w-12 h-12" />
						</div>
						<h1 className="text-3xl font-bold">Signup</h1>
						<p className="text-balance text-neutral-500">
							Enter your email below to create your account
						</p>
					</div>
					<form
						className="space-y-4"
						onSubmit={handleSubmit(async (data) => {
							const res = await signup.mutate(data);
							if (res.success) {
								toast.success(
									"Your account is ready! Now you can login with your credentials",
								);
								return redirectPage(router, "AUTH_LOGIN");
							}
						})}
					>
						<Input
							type="email"
							label="Email"
							placeholder="example@mail.com"
							required
							icon
							errorLabel={formState.errors.email?.message}
							{...register("email")}
						/>
						<Input
							type="password"
							label="Password"
							placeholder="********"
							required
							icon
							errorLabel={formState.errors.password?.message}
							{...register("password")}
						/>
						<Input
							type="password"
							label="Repeat Password"
							placeholder="********"
							required
							icon
							errorLabel={formState.errors.repeatPassword?.message}
							{...register("repeatPassword")}
						/>
						<Button
							type="submit"
							className="w-full btn-gradient"
							disabled={signup.loading}
						>
							Signup
						</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<a href={ROUTES.AUTH_LOGIN} className="underline">
							Log In
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
