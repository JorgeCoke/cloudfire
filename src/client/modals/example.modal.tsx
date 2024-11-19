import { Button } from "../components/ui/buttons";
import { Card } from "../components/ui/card";
import { H2, H4 } from "../components/ui/typography";
import { $modal } from "./modals";

export const ExampleModal = () => {
	return (
		<Card className="p-8 space-y-6">
			<H2 className="text-center">Example Modal</H2>
			<H4 className="text-neutral-500">This is an example modal</H4>
			<Button
				onClick={() => {
					$modal.set("NONE");
				}}
			>
				Close
			</Button>
		</Card>
	);
};
