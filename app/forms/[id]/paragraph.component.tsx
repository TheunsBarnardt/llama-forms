import { Textarea } from "@/components/ui/textarea";

export function Paragraph() {
	return (
		<Textarea 
		placeholder="Short answer text" 
		className="mb-2 border-0 drop-shadow-none border-b-1 border-secondary focus:border-0 focus:ring-0 rounded-none focus:drop-shadow-none"
		spellCheck={true}
		 />
	);
}
