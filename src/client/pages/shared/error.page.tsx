import { getPagePath } from "@nanostores/router";
import { AnchorButton } from "../../components/ui/buttons";
import { H1, H4 } from "../../components/ui/typography";
import { router$ } from "../../router";

export default function ErrorPage({ code = "500" }: { code?: string }) {
	return (
		<section className="container h-dvh flex flex-col space-y-12 justify-center items-center">
			<H1 className="text-center">
				<span className="font-thin">Error</span> {code}
			</H1>
			<H4 className="text-neutral-500 font-thin">
				Oops... something went wrong!
			</H4>
			<AnchorButton
				className="mx-auto"
				href={getPagePath(router$, "DASHBOARD")}
			>
				Go Back
			</AnchorButton>
		</section>
	);
}
