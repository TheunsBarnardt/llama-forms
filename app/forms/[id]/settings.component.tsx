interface SettingsProps {
		id: string;

}

export function Settings( prop : SettingsProps) {
	return (
		<>
			<h1>{prop.id}</h1>
		</>
	);
}
