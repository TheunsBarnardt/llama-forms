import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Question, Form } from "@/prisma/interfaces";
import { IAddons } from "./IAddons";
import { CalendarIcon, Text } from "lucide-react";
import React, { useState } from "react";
import { createDropdownMenuCheckboxItem, handleTagChange } from "./addon-helper";
import { SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Render Component
const Render: IAddons["render"] = ({ question, form }: { form: Form; question: Question }) => {
  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{question.name}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Design Component
const Design: IAddons["design"] = () => {
  return (
    <Button
      variant={"outline"}
      className={"w-[240px] pl-3 text-left font-normal text-muted-foreground"}
    >
      <span>Pick a date</span>
      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    </Button>
  );
};

// Render Dropdown Component
const Options: IAddons["options"] = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["Description", "Response validation"]; //Corrected spelling

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
    <SelectItem value="date-picker">
      <Text className="inline-block mr-2" />
      Date Picker
    </SelectItem>
  );
};

const DatePickerAddon: IAddons & { menu: React.FC } = {
  render: Render,
  design: Design,
  options: Options,
  menu: Menu,
};

export default DatePickerAddon;