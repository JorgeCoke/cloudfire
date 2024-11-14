import { ArrowRight, Github, PenToolIcon } from "lucide-react";
import { ROUTES } from "../../router";
import { Badge } from "../ui/badge";
import { AnchorButton } from "../ui/buttons";
import { H0 } from "../ui/typography";

export const Hero = () => {
	return (
		<section className="container">
			<div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto pt-20">
				<div className="text-center space-y-12">
					<Badge className="bg-white rounded-lg">
						<Badge className="py-0.5 bg-gradient-to-tl from-primary-light to-violet-900 text-white shadow-none">
							New
						</Badge>
						<span> Template is out now! </span>
					</Badge>
					<H0 className="max-w-screen-lg mx-auto text-center">
						Experience the
						<br />
						<span className="animate-text-gradient bg-gradient-to-r from-primary via-violet-900 to-primary bg-[200%_auto] text-transparent bg-clip-text">
							Cloudfire
						</span>{" "}
						<span className="hue-rotate-180 hover:-hue-rotate-180 transition-all duration-1000 cursor-pointer">
							🔥
						</span>{" "}
						adventure
					</H0>
					<p className="max-w-md mx-auto text-center text-lg text-neutral-500">
						Delightful, overpowered, beautifully handcrafted full-stack web
						framework template, built on top of NextJS & Cloudflare, seasoned
						with modern tools
					</p>
					<div className="space-y-4 md:space-y-0 md:space-x-4">
						<AnchorButton
							href={ROUTES.AUTH_LOGIN}
							className="w-5/6 md:w-1/4 font-bold group/arrow btn-gradient"
						>
							Access
							<ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
						</AnchorButton>
						<AnchorButton
							href={ROUTES.PLAYGROUND}
							className="w-5/6 md:w-1/4 font-bold group/pen"
						>
							UI Kit
							<PenToolIcon className="size-5 ml-2 group-hover/pen:translate-x-1 transition-transform" />
						</AnchorButton>
						<AnchorButton
							href="https://github.com/JorgeCoke/cloudfire"
							className="w-5/6 md:w-1/4 font-bold group/github"
							target="_blank"
						>
							Github
							<Github className="size-5 ml-2 group-hover/github:translate-x-1 transition-transform" />
						</AnchorButton>
					</div>
				</div>
			</div>
		</section>
	);
};
