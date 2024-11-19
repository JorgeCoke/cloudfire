import { useStore } from "@nanostores/react";
import { Flame, User } from "lucide-react";
import { useEffect } from "react";
import { ROUTES, router } from "../../router";
import { $doGetProfile, $jwt } from "../../services/auth.service";
import { AnchorButton } from "../ui/buttons";

export const NavBar = () => {
	const getProfile = useStore($doGetProfile);
	const page = useStore(router);

	useEffect(() => {
		// Update JWT on every profile fetch
		const newJwt = getProfile.data?.jwt;
		if (newJwt) {
			$jwt.set({
				jwt: newJwt,
				payload: JSON.parse(atob(newJwt.split(".")[1])),
			});
		}
	}, [getProfile.data?.jwt]);

	if (page?.route === "AUTH_LOGIN" || page?.route === "AUTH_SIGNUP") {
		return null;
	}

	return (
		<header className="md:max-w-screen-md md:top-5 backdrop-blur-sm z-10 p-3 px-4 left-0 right-0 m-auto fixed w-full shadow-sm md:rounded-full border-b md:border border-neutral-200 bg-white/90 flex justify-between items-center">
			<a
				className="flex items-center gap-3 font-bold text-lg cursor-pointer hover:scale-105 transition-all duration-300"
				href="/"
			>
				<Flame className="h-6 w-6" />
				Cloudfire
			</a>
			{!getProfile.data?.user && (
				<AnchorButton
					className="rounded-full btn-gradient"
					href={ROUTES.AUTH_LOGIN}
				>
					Login
				</AnchorButton>
			)}
			{getProfile.data?.user && (
				<div className="gap-4 flex">
					<AnchorButton className="rounded-full" href={ROUTES.DASHBOARD}>
						Dashboard
					</AnchorButton>
					<AnchorButton
						className="rounded-full btn-gradient"
						href={ROUTES.PROFILE}
					>
						<User className="w-4 h-4" />
					</AnchorButton>
				</div>
			)}
		</header>
	);
};
