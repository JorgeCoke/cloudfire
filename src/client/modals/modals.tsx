import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { ProfileModal } from "./profile.modal";

export type MODAL = "NONE" | "PROFILE_MODAL";

export const $modal = atom<MODAL>("NONE");

export const Modals = () => {
	const modal = useStore($modal);

	if (modal === "NONE") {
		return null;
	}

	return (
		<div
			onClick={() => $modal.set("NONE")}
			className="w-dvw h-dvh backdrop-blur-sm bg-black/30 absolute left-0 top-0 z-10 flex align-middle items-center justify-center"
		>
			<div
				className="max-w-xl w-full shadow-md"
				onClick={(e) => e.stopPropagation()}
			>
				{modal === "PROFILE_MODAL" && <ProfileModal />}
			</div>
		</div>
	);
};
