import { useStore } from "@nanostores/react";
import { AnchorButton } from "../components/ui/buttons";
import { ROUTES } from "../router";
import { $doGetMe } from "../services/auth.service";
import { H2, H4 } from "../components/ui/typography";

export default function DashboardPage() {
	const getMe = useStore($doGetMe);

	return (
		<main className="container flex flex-col space-y-6 py-32">
			<H2 className="font-thin text-center">
				Hello{" "}
				<span className="font-normal">
					{getMe.loading ? "loading..." : getMe.data?.user?.email}
				</span>
			</H2>
			<H4 className="text-center text-neutral-500">
				Welcome to your dashboard
			</H4>
			<div className="flex gap-6 mx-auto">
				<AnchorButton href={ROUTES.HOME}>HOME</AnchorButton>
			</div>
		</main>
	);
}
