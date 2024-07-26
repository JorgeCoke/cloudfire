import { Loader } from "lucide-react";

export default function Spinner() {
	return (
		<div className="w-full h-svh flex justify-center items-center">
			<Loader className="animate-spin" size={32} />
			<span className="sr-only">loading</span>
		</div>
	);
}
