import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ROUTES } from "../../router";

export default function ErrorPage() {
	const params = useParams();

	return (
		<div className="container h-svh w-full flex justify-center">
			<div className="flex flex-col items-center justify-center gap-2">
				<h1 className="text-8xl font-bold leading-tight">
					{params.errorCode || 500}
				</h1>
				<span className="font-medium">Oops! Something went wrong 🥲</span>
				<p className="text-center text-muted-foreground">
					We apologize for the inconvenience. <br /> Please try again later.
				</p>
				<div className="mt-6 flex gap-4">
					<Button asChild>
						<a href={ROUTES.AUTH.LOG_IN}>Back to Home</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
