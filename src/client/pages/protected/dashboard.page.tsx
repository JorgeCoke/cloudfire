import { H4 } from "../../components/ui/typography";
import { $jwt } from "../../services/auth.service";

export default function DashboardPage() {
	return (
		<main className="container flex flex-col space-y-6 py-32">
			<H4 className="text-center text-neutral-500">
				Welcome to your dashboard
			</H4>
			<p className="text-center max-w-screen-sm mx-auto">
				You have an active session, you are an{" "}
				<strong>{$jwt.get()?.payload.role}</strong> and your userId is:{" "}
				<strong>{$jwt.get()?.payload.userId}</strong>
			</p>
		</main>
	);
}
