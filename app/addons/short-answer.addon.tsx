import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Question, Form } from "@/prisma/interfaces";
import { IAddons } from "./IAddons";
import { Text } from "lucide-react";
import React, { useState } from "react";
import { createDropdownMenuCheckboxItem, handleTagChange } from "./addon-helper";
import { SelectItem } from "@/components/ui/select";

// Render Component
const Render: IAddons["render"] = ({ question, form }: { form: Form; question: Question }) => {
  return (
    <FormField
      control={form.control}
      name={question.id.toString()}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{question.name}</FormLabel>
          <FormControl>
            <Input type="" {...field} />
          </FormControl>
          <FormDescription>This is your short answer.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Design Component
const Design: IAddons["design"] = () => {
  return (
    <Input
      placeholder="Short answer text"
      className="mb-2 border-0 drop-shadow-none border-b-1 border-secondary focus:border-0 focus:ring-0 rounded-none focus:drop-shadow-none"
      spellCheck={true}
    />
  );
};

// Render Dropdown Component
const Options: IAddons["options"] = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["Description", "Responce validation"]; 

  const dropdownItems = tags.map((tag) =>
    createDropdownMenuCheckboxItem(tag, selectedTags, (tag, checked) =>
      handleTagChange(tag, checked, selectedTags, setSelectedTags)
    )
  );

  return (
    <>
        {dropdownItems}
    </>
  );
};

// Menu Item Component
const Menu: React.FC = () => {
  return (
    <SelectItem value="short_answer">
      <Text className="inline-block mr-2" />
      Short answer
    </SelectItem>
  );
};

const ShortAnswerAddon: IAddons & { menu: React.FC } = { 
  render: Render,
  design: Design,
  options: Options,
  menu: Menu,
};

export default ShortAnswerAddon;