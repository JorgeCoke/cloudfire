import { useStore } from "@nanostores/react";
import { getPagePath, openPage } from "@nanostores/router";
import { ArrowRight, Flame, User } from "lucide-react";
import { useEffect } from "react";
import { $modal } from "../../modals/modals";
import { $router } from "../../router";
import { $doGetProfile, $jwt } from "../../services/auth.service";
import { AnchorButton, Button } from "../ui/buttons";

export const NavBar = () => {
	const getProfile = useStore($doGetProfile);
	const page = useStore($router);
	const router = useStore($router);

	useEffect(() => {
		// Update JWT on every profile fetch
		const newJwt = getProfile.data?.jwt;
		if (newJwt) {
			$jwt.set({
				jwt: newJwt,
				payload: JSON.parse(atob(newJwt.split(".")[1])),
			});
		} else {
			localStorage.removeItem("session");
			$jwt.set(undefined);
		}
	}, [getProfile.data?.jwt]);

	if (page?.route === "AUTH_LOGIN" || page?.route === "AUTH_SIGNUP") {
		return null;
	}

	return (
		<header className="md:max-w-screen-md md:top-5 backdrop-blur-sm z-10 p-3 px-4 left-0 right-0 m-auto fixed w-full shadow-sm md:rounded-full border-b md:border border-neutral-200 bg-white/90 flex justify-between items-center">
			<a
				className="flex items-center gap-3 font-bold text-lg cursor-pointer hover:scale-105 transition-all duration-300"
				href={getPagePath($router, "HOME")}
			>
				<Flame className="h-6 w-6" />
				Cloudfire
			</a>
			{!getProfile.data?.user && (
				<AnchorButton
					className="rounded-full btn-gradient"
					href={getPagePath($router, "AUTH_LOGIN")}
				>
					Login
				</AnchorButton>
			)}
			{getProfile.data?.user && (
				<div className="gap-4 flex">
					<Button
						className="rounded-full btn-gradient"
						onClick={() => {
							if (router?.route === "HOME") {
								openPage($router, "DASHBOARD");
							} else {
								$modal.set("PROFILE_MODAL");
							}
						}}
					>
						{router?.route === "HOME" && (
							<>
								Access
								<ArrowRight className="w-4 h-4" />
							</>
						)}
						{router?.route !== "HOME" && <User className="w-4 h-4" />}
					</Button>
				</div>
			)}
		</header>
	);
};
