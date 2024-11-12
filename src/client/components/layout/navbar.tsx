import { useStore } from "@nanostores/react";
import { $doGetMe } from "../../services/auth.service";
import { Flame } from "lucide-react";
import { AnchorButton, Button } from "../ui/buttons";
import { router, ROUTES } from "../../router";
import toast from "react-hot-toast";
import { redirectPage } from "@nanostores/router";
import { mutateCache } from "../../lib/nanoquery";

export const NavBar = () => {
	const getMe = useStore($doGetMe);
	const page = useStore(router);

	if (page?.route === "AUTH_LOGIN" || page?.route === "AUTH_SIGNUP") {
		return null;
	}

	return (
		<header className="md:max-w-screen-md md:top-5 p-3 px-4 shadow-sm left-0 right-0 m-auto fixed w-full rounded-xl border border-black/[.1] bg-white flex justify-between items-center">
			<p className="flex items-center gap-3 font-bold">
				<Flame className="h-6 w-6" />
				Cloudfire
			</p>
			{!getMe.data?.user && (
				<AnchorButton href={ROUTES.AUTH_LOGIN}>Login</AnchorButton>
			)}
			{getMe.data?.user && (
				<Button
					color="danger"
					onClick={() => {
						toast.success("Bye!");
						localStorage.removeItem("jwt");
						mutateCache("/auth/me", null);
						redirectPage(router, "AUTH_LOGIN");
					}}
				>
					Logout
				</Button>
			)}
		</header>
	);
};
