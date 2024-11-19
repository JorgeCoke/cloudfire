import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { ExampleModal } from "./example.modal";

export type MODAL = "NONE" | "EXAMPLE";

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
			<div className="max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
				{modal === "EXAMPLE" && <ExampleModal />}
			</div>
		</div>
	);
};
