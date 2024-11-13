import { Benefits } from "../components/home/benefits";
import { Footer } from "../components/home/footer";
import { Hero } from "../components/home/hero";
import { HeroBg } from "../components/home/hero-bg";

export default function HomePage() {
	return (
		<>
			<HeroBg />
			<main className="container pt-20">
				<Hero />
				<Benefits />
			</main>
			<Footer />
		</>
	);
}
