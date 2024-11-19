import { useStore } from "@nanostores/react";
import { redirectPage } from "@nanostores/router";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/buttons";
import { H2, H4 } from "../../components/ui/typography";
import { mutateCache } from "../../lib/nanoquery";
import { router } from "../../router";
import {
	$doGetProfile,
	$jwt,
	AuthServiceKeys,
} from "../../services/auth.service";

export default function ProfilePage() {
	const getMe = useStore($doGetProfile);

	return (
		<main className="container flex flex-col space-y-6 py-28">
			<H2 className="font-thin text-center">
				Hello{" "}
				<span className="font-normal">
					{getMe.loading ? "loading..." : getMe.data?.user?.email}
				</span>
			</H2>
			<H4 className="text-center text-neutral-500">
				Here you can configure your profile
			</H4>
			<p className="text-center">
				You are an <strong>{$jwt.get()?.payload.role}</strong> and your userId
				is: <strong>{$jwt.get()?.payload.userId}</strong>
			</p>
			<div className="mx-auto">
				<Button
					className="rounded-full bg-gradient-to-tl from-red-800 to-red-500 border-red-500 w-fit"
					color="danger"
					onClick={() => {
						toast.success("Bye!");
						$jwt.set(undefined);
						mutateCache(AuthServiceKeys.GET_PROFILE, null);
						redirectPage(router, "HOME");
					}}
				>
					Logout
				</Button>
			</div>
		</main>
	);
}
