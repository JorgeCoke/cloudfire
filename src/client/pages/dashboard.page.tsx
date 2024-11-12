import { useStore } from "@nanostores/react";
import { redirectPage } from "@nanostores/router";
import toast from "react-hot-toast";
import { AnchorButton, Button } from "../components/ui/buttons";
import { H1, H4 } from "../components/ui/typography";
import { ROUTES, router } from "../router";
import { $doGetMe } from "../services/auth.service";

export const DashboardPage = () => {
	const getMe = useStore($doGetMe);

	return (
		<main className="container space-y-6">
			<H1>Dashboard</H1>
			<H4>Hello: {getMe.loading ? "loading..." : getMe.data?.user?.email}</H4>
			<div className="flex gap-6">
				<AnchorButton href={ROUTES.HOME}>HOME</AnchorButton>
				<Button
					color="danger"
					onClick={() => {
						toast.success("Bye!");
						localStorage.removeItem("jwt");
						redirectPage(router, "AUTH_LOGIN");
					}}
				>
					Logout
				</Button>
			</div>
		</main>
	);
};
