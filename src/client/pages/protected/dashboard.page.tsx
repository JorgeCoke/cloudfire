import { getPagePath } from "@nanostores/router";
import { AnchorButton, Button } from "../../components/ui/buttons";
import { H4 } from "../../components/ui/typography";
import { $modal } from "../../modals/modals";
import { router$ } from "../../router";

export default function DashboardPage() {
	return (
		<main className="container flex flex-col space-y-6 py-32">
			<H4 className="text-center text-neutral-500">
				Welcome to your dashboard
			</H4>
			<div className="flex gap-6 mx-auto">
				<Button onClick={() => $modal.set("EXAMPLE")}>
					Show Example Modal
				</Button>
				<AnchorButton href={getPagePath(router$, "HOME")}>HOME</AnchorButton>
			</div>
		</main>
	);
}
