import { FormGridItem, FormGridItemProps } from './form-grid-item.component';
import  data from './../../_resources/formsdata.json';

export default function Page() {

	function convertToIconDefinition(icon: string): import("@fortawesome/fontawesome-common-types").IconDefinition {
		// Implement the function logic here or remove it if unnecessary
		return { prefix: 'fas', iconName: icon as import("@fortawesome/fontawesome-common-types").IconName, icon: [512, 512, [], '', ''] }; // Example implementation
	}

	return (
		<div className="inline-grid grid-cols-3 gap-4">
			{data.map((form, index: number) => {
				const transformedForm: FormGridItemProps = {
					...form,
					icon: convertToIconDefinition(form.icon), // Replace with a function to convert string to IconDefinition
				};
				return <FormGridItem key={index} {...transformedForm} />;
			})}
		</div>
	);
}
