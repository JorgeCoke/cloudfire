import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { redirectPage } from "@nanostores/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LANG } from "../../../models/enums";
import { PostProfileBodyDto } from "../../../server/routes/auth/auth.dtos";
import { Button } from "../../components/ui/buttons";
import { Select } from "../../components/ui/form";
import { H2 } from "../../components/ui/typography";
import { mutateCache, revalidateKeys } from "../../lib/nanoquery";
import { router$ } from "../../router";
import {
	$doGetProfile,
	$doPostProfile,
	$jwt,
	AuthServiceKeys,
} from "../../services/auth.service";

export default function ProfilePage() {
	const getProfile = useStore($doGetProfile);
	const postProfile = useStore($doPostProfile);
	const { register, handleSubmit, formState } = useForm<PostProfileBodyDto>({
		resolver: zodResolver(PostProfileBodyDto),
		defaultValues: {
			language: getProfile.data?.user.language,
		},
	});

	return (
		<main className="container flex flex-col space-y-6 py-28">
			<H2 className="font-thin text-center">
				Hello{" "}
				<span className="font-normal">
					{getProfile.loading ? "loading..." : getProfile.data?.user?.email}
				</span>
			</H2>
			<p className="text-center">
				You are an <strong>{$jwt.get()?.payload.role}</strong> and your userId
				is: <strong>{$jwt.get()?.payload.userId}</strong>
			</p>
			<form
				className="space-y-4 mx-auto min-w-96"
				onSubmit={handleSubmit(async (data) => {
					await postProfile.mutate(data);
					revalidateKeys(AuthServiceKeys.GET_PROFILE);
					toast.success("Profile updated!");
				})}
			>
				<Select
					label="Select language"
					required
					description="Select your prefered language"
					options={[
						...Object.values(LANG).map((e) => ({ label: e, value: e })),
					]}
					errorLabel={formState.errors.language?.message}
					{...register("language", {
						setValueAs: (value) => value || undefined,
					})}
				/>
				<Button type="submit" className="w-full" disabled={postProfile.loading}>
					Update Profile
				</Button>
			</form>
			<div className="mx-auto">
				<Button
					className="rounded-full bg-gradient-to-tl from-red-800 to-red-500 border-red-500"
					color="danger"
					onClick={() => {
						toast.success("Bye!");
						$jwt.set(undefined);
						mutateCache(AuthServiceKeys.GET_PROFILE, null);
						redirectPage(router$, "HOME");
					}}
				>
					Logout
				</Button>
			</div>
		</main>
	);
}
