export default function ErrorPage({ code = "500" }: { code?: string }) {
	// TODO:
	return <h1>ERROR {code}</h1>;
}
