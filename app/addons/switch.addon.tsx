import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Question, Form } from "@/prisma/interfaces";
import { IAddons } from "./IAddons";
import { Text } from "lucide-react";
import React, { useState } from "react";
import {
  createDropdownMenuCheckboxItem,
  handleTagChange,
} from "./addon-helper";
import { SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Render Component
const Render: IAddons["render"] = ({
  question,
  form,
}: {
  form: Form;
  question: Question;
}) => {
  const [selectedTags] = useState<string[]>([]); 
  return (
    <FormField
      control={form.control}
      name="marketing_emails"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>{question.name}</FormLabel>
            {selectedTags.includes("Description") && (
            <FormDescription>
              {question.description}
            </FormDescription>
             )}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

// Design Component
const Design: IAddons["design"] = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode"></Label>
    </div>
  )
};

// Render Dropdown Component
const Options: IAddons["options"] = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["Description", "Response validation"]; 

  const dropdownItems = tags.map((tag) =>
    createDropdownMenuCheckboxItem(tag, selectedTags, (tag, checked) =>
      handleTagChange(tag, checked, selectedTags, setSelectedTags)
    )
  );

  return <>{dropdownItems}</>;
};

// Menu Item Component
const Menu: React.FC = () => {
  return (
    <SelectItem value="switch">
      <Text className="inline-block mr-2" />
      Switch
    </SelectItem>
  );
};

const SwitchAddon: IAddons & { menu: React.FC } = {
  render: Render,
  design: Design,
  options: Options,
  menu: Menu,
};

export default SwitchAddon;