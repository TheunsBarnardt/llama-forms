import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Question, Form } from "@/prisma/interfaces";
import { IAddons } from "./IAddons";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import {
  createDropdownMenuCheckboxItem,
  handleTagChange,
} from "./addon-helper";
import { SelectItem } from "@/components/ui/select";

// Render Component
const Render: IAddons["render"] = ({
  question,
  form,
}: {
  question: Question;
  form: Form;
}) => {
  return (
    <FormField
      control={form.control}
      name={question.id.toString()}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{question.name}</FormLabel>
          <FormControl>
            <Textarea className="resize-none" {...field} />
          </FormControl>
          <FormDescription>
            You can @mention other users and organizations.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Design Component
const Design: IAddons["design"] = () => {
  return (
    <Textarea
      placeholder="Paragraph text"
      className="mb-2 border-0 drop-shadow-none border-b-1 border-secondary focus:border-0 focus:ring-0 rounded-none focus:drop-shadow-none"
      spellCheck={true}
    />
  );
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

// Select Item Component
const Menu: React.FC = () => {
  return (
    <SelectItem value="paragraph">
      <MessageSquare className="inline-block mr-2" />
      Paragraph
    </SelectItem>
  );
};

const ParagraphAddon: IAddons & { menu: React.FC } = {
  render: Render,
  design: Design,
  options: Options,
  menu: Menu,
};

export default ParagraphAddon;
