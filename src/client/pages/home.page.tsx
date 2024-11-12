import { AnchorButton } from "../components/ui/buttons";
import { ROUTES } from "../router";

export default function HomePage() {
	return (
		<main className="container">
			<AnchorButton href={ROUTES.AUTH_LOGIN}>LOGIN</AnchorButton>
			<AnchorButton href={ROUTES.DASHBOARD}>DASHBOARD</AnchorButton>
			<AnchorButton href={ROUTES.PLAYGROUND}>PLAYGROUND</AnchorButton>
		</main>
	);
}
