import { Github } from "lucide-react";
import { AnchorButton } from "../ui/buttons";

export const Footer = () => {
	return (
		<footer className="w-full border-t border-neutral-200 py-12 bg-white">
			<div className="container space-y-6 text-center px-4">
				<p className="cal text-xl font-semibold">Cloudfire</p>
				<p className="text-sm text-neutral-700 ">
					Copyright © 2025 JorgeCoke - All rights reserved. See our{" "}
					<a
						href="/"
						aria-label="Terms and Conditions"
						className="underline underline-offset-4 hover:text-black"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="/"
						aria-label="Privacy Policy"
						className="underline underline-offset-4 hover:text-black"
					>
						Privacy Policy
					</a>
				</p>

				<div className="flex items-center justify-between">
					<AnchorButton
						variant="ghost"
						size="icon"
						href="https://github.com/JorgeCoke/cloudfire"
						target="_blank"
					>
						<Github className="size-5" />
					</AnchorButton>
					<p className="text-xs text-black opacity-50">v1.0.0</p>
				</div>
			</div>
		</footer>
	);
};
