import { Atom, CloudCog, Flame, Sparkle } from "lucide-react";
import type { ReactElement } from "react";
import { Card } from "../ui/card";

interface BenefitsProps {
	icon: ReactElement<unknown, string>;
	title: string;
}

const benefitList: BenefitsProps[] = [
	{
		icon: <Flame size={32} className="mb-6 text-neutral-900" />,
		title: "Hono",
	},
	{
		icon: <Atom size={32} className="mb-6 text-neutral-900" />,
		title: "React",
	},
	{
		icon: <Sparkle size={32} className="mb-6 text-neutral-900" />,
		title: "Drizzle",
	},
	{
		icon: <CloudCog size={32} className="mb-6 text-neutral-900" />,
		title: "Clouflare",
	},
];

export const Benefits = () => {
	return (
		<section id="benefits" className="container py-24 sm:py-32 ">
			<div className="grid md:grid-cols-2 place-items-center md:gap-12">
				<div>
					<h2 className="text-xl mb-2 tracking-widest">Benefits</h2>

					<h2 className="text-3xl md:text-4xl font-bold mb-4 py-4">
						What&apos;s included?
					</h2>
					<p className="text-xl text-neutral-500 mb-8">
						This repo comes fully stacked with everything you need for your
						enterprise startup. Stop worrying about boilerplate integrations and
						start building your product today!
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-4 w-full">
					{benefitList.map(({ icon, title }, index) => (
						<Card
							key={title}
							className="bg-white hover:bg-background transition-all delay-75 group/number p-4 duration-200 hover:scale-105 hover:border-neutral-400 hover:border-2"
						>
							<div className="flex justify-between">
								{icon}
								<span className="opacity-50 text-5xl font-medium transition-all delay-75 text-neutral-200 group-hover/number:text-neutral-500/50">
									0{index + 1}
								</span>
							</div>
							<p className="text-lg font-semibold">{title}</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
