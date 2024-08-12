import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";
console.log(React.version); // Do not remove "react" import

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

// const logo = {
// 	margin: "0 auto",
// };

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
};

const btnContainer = {
	textAlign: "center" as const,
};

const button = {
	backgroundColor: "#0a0a0a",
	borderRadius: "3px",
	color: "#fff",
	fontSize: "16px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "12px",
};

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};

const footer = {
	color: "#8898aa",
	fontSize: "12px",
};

export const ActionButtonTemplate = ({
	url,
	paragraphs,
	buttonLabel,
}: {
	url: string;
	paragraphs: string[];
	buttonLabel: string;
}) => (
	<Html>
		<Head />
		<Preview>{paragraphs[0]}</Preview>
		<Body style={main}>
			<Container style={container}>
				<Heading as="h1">Cloudfire</Heading>
				{paragraphs.map((e, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<Text key={index} style={paragraph}>
						{e}
					</Text>
				))}
				<Section style={btnContainer}>
					<Button style={button} href={url}>
						{buttonLabel}
					</Button>
				</Section>
				<Text style={paragraph}>
					Best,
					<br />
					Cloudfire Team
				</Text>
				<Hr style={hr} />
				<Text style={footer}>
					If the button does not work, please, click the following link:{" "}
					<Link href={url}>{url}</Link>
				</Text>
			</Container>
		</Body>
	</Html>
);
