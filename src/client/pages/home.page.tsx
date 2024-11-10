import { AnchorButton } from "../components/ui/buttons";
import { ROUTES } from "../router";

export const HomePage = () => {
	return (
		<main className="container space-y-6">
			<AnchorButton href={ROUTES.AUTH_LOGIN}>LOGIN</AnchorButton>
			<AnchorButton href={ROUTES.PLAYGROUND}>PLAYGROUND</AnchorButton>
		</main>
	);
};
