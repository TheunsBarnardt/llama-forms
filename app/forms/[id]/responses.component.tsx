interface ResponsesProps {
	id: string;
}

export function Responses(prop : ResponsesProps) {
	return (
		<>
		<h1>{prop.id}</h1>
		</>
	);
}
