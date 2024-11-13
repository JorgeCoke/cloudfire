import { useStore } from "@nanostores/react";
import { redirectPage } from "@nanostores/router";
import { Flame } from "lucide-react";
import toast from "react-hot-toast";
import { mutateCache } from "../../lib/nanoquery";
import { ROUTES, router } from "../../router";
import { $doGetMe, $jwt, AuthServiceKeys } from "../../services/auth.service";
import { AnchorButton, Button } from "../ui/buttons";

export const NavBar = () => {
	const getMe = useStore($doGetMe);
	const page = useStore(router);

	if (page?.route === "AUTH_LOGIN" || page?.route === "AUTH_SIGNUP") {
		return null;
	}

	return (
		<header className="md:max-w-screen-md md:top-5 backdrop-blur-sm z-10 p-3 px-4 left-0 right-0 m-auto fixed w-full shadow-sm md:rounded-full border-b md:border border-neutral-200 bg-white/[.9] flex justify-between items-center">
			<a
				className="flex items-center gap-3 font-bold text-lg cursor-pointer"
				href="/"
			>
				<Flame className="h-6 w-6" />
				Cloudfire
			</a>
			{!getMe.data?.user && (
				<AnchorButton className="rounded-full" href={ROUTES.AUTH_LOGIN}>
					Login
				</AnchorButton>
			)}
			{getMe.data?.user && (
				<Button
					className="rounded-full"
					color="danger"
					onClick={() => {
						toast.success("Bye!");
						$jwt.set(undefined);
						mutateCache(AuthServiceKeys.GET_ME, null);
						redirectPage(router, "AUTH_LOGIN");
					}}
				>
					Logout
				</Button>
			)}
		</header>
	);
};
