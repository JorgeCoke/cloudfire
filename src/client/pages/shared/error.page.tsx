export default function ErrorPage({ code = "500" }: { code?: string }) {
	return <h1>ERROR {code}</h1>;
}