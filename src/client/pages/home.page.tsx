import { AnchorButton } from "../components/ui/buttons";
import { ROUTES } from "../router";

export const HomePage = () => {
	return (
		<main className="container">
			<AnchorButton href={ROUTES.AUTH_LOGIN}>LOGIN</AnchorButton>
			<AnchorButton href={ROUTES.DASHBOARD}>DASHBOARD</AnchorButton>
			<AnchorButton href={ROUTES.PLAYGROUND}>PLAYGROUND</AnchorButton>
		</main>
	);
};
