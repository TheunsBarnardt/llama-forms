"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Calendar,
  CheckSquare,
  CircleChevronDown,
  Copy,
  EllipsisVertical,
  FileUp,
  Grid,
  Grip,
  GripHorizontal,
  List,
  MessageSquare,
  SlidersVertical,
  Star,
  Text,
  Timer,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { ShortAnswer } from "./short-answer.component";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paragraph } from "./paragraph.component";
import { MultipleChoiceQuestion } from "./multiple-choice-question.component";
import { CheckBoxQuestion } from "./checkbox-question.component";
import { DropdownQuestion } from "./dropdown-question.component";
import { Question } from "@/prisma/interfaces";
import { deleteQuestion, editQuestion } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function QuestionDesignItem({
  field,
  id,
  draggingClassName,
  onDelete, // Added prop
}: {
  field: Question;
  id: string;
  draggingClassName?: string;
  onDelete: (deletedQuestionId: number) => void; // Added prop type
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: transform ? 0.5 : 1,
  };
  const [currentField, setCurrentField] = useState<Question>(field);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const handleQuestionChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedField = { ...currentField, name: e.target.value };
    setCurrentField(updatedField);
    await editQuestion(updatedField);
  };

  const handleTypeChange = async (value: string) => {
    const updatedField = { ...currentField, type: value as Question["type"] };
    setCurrentField(updatedField);
    await editQuestion(updatedField);
  };

  const handleRequiredChange = async (checked: boolean) => {
    const updatedField = { ...currentField, required: checked };
    setCurrentField(updatedField);
    await editQuestion(updatedField);
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(currentField.id);
      debugger;
      setIsRemoveDialogOpen(false); // Close the dialog
      onDelete(currentField.id); // Call the callback
    } catch (error) {
      console.error("Error deleting question:", error);
      setIsRemoveDialogOpen(false); // Close dialog even on error
      // Optionally, show an error message to the user
    }
  };
  const renderQuestionType = () => {
    switch (currentField.type) {
      case "short_answer":
        return <ShortAnswer />;
      case "paragraph":
        return <Paragraph />;
      case "multiple_choice":
        return <MultipleChoiceQuestion {...currentField} />;
      case "checkboxes":
        return <CheckBoxQuestion {...currentField} />;
      case "dropdown":
        return <DropdownQuestion {...currentField} />;
      case "file_upload":
        return <Input type="file" className="mb-2" />;
      case "linear_scale":
        return (
          <div className="flex items-center">
            <span className="mr-2">1</span>
            <input type="range" min="1" max="5" className="w-full" />
            <span className="ml-2">5</span>
          </div>
        );
      case "rating":
        return <div>Rating (Not implemented)</div>;
      case "multiple_choice_grid":
        return <div>Multiple Choice Grid (Not implemented)</div>;
      case "checkbox_grid":
        return <div>Checkbox Grid (Not implemented)</div>;
      case "date":
        return <Input type="date" className="mb-2" />;
      case "time":
        return <Input type="time" className="mb-2" />;
      default:
        return <Input placeholder="Short answer text" className="mb-2" />;
    }
  };

  const createDropdownMenuCheckboxItem = (label: string) => (
    <DropdownMenuCheckboxItem
      checked={selectedTags.includes(label)}
      key={label}
      onCheckedChange={(checked) => handleTagChange(label, checked)}
      onSelect={(e) => e.preventDefault()}
    >
      {label}
    </DropdownMenuCheckboxItem>
  );

  const ShuffleOptionOrder = createDropdownMenuCheckboxItem(
    "Shuffle option order"
  );
  const GoToSelectionBasedOnAnswer = createDropdownMenuCheckboxItem(
    "Go to selection based on answer"
  );
  const Description = createDropdownMenuCheckboxItem("Description");
  const ResponceValidation = createDropdownMenuCheckboxItem(
    "Responce validation"
  );
  const LimitToOneResponsePerColumn = createDropdownMenuCheckboxItem(
    "Limit to one response per column"
  );
  const ShuffleRowOrder = createDropdownMenuCheckboxItem("Shuffle row order");
  const IncludeTime = createDropdownMenuCheckboxItem("Include time");
  const IncludeYear = createDropdownMenuCheckboxItem("Include year");
  const Time = createDropdownMenuCheckboxItem("Time");
  const Duration = createDropdownMenuCheckboxItem("Duration");

  const renderDropdown = () => {
    switch (currentField.type) {
      case "short_answer":
      case "paragraph":
        return (
          <>
            {Description}
            {ResponceValidation}
          </>
        );
      case "dropdown":
      case "multiple_choice":
        return (
          <>
            {Description}
            {GoToSelectionBasedOnAnswer}
            <DropdownMenuSeparator />
            {ShuffleOptionOrder}
          </>
        );
      case "checkboxes":
        return (
          <>
            {Description}
            {ResponceValidation}
            <DropdownMenuSeparator />
            {ShuffleOptionOrder}
          </>
        );
      case "file_upload":
      case "linear_scale":
      case "rating":
        return <>{Description}</>;
      case "multiple_choice_grid":
      case "checkbox_grid":
        return (
          <>
            {Description}
            <DropdownMenuSeparator />
            {LimitToOneResponsePerColumn}
            {ShuffleRowOrder}
          </>
        );
      case "date":
        return (
          <>
            {Description}
            <DropdownMenuSeparator />
            {IncludeTime}
            {IncludeYear}
          </>
        );
      case "time":
        return (
          <>
            {Description}
            <DropdownMenuSeparator />
            {Time}
            {Duration}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col border pb-4 mb-4 gap-2 border-l-6 border-l-blue-500 bg-background rounded-lg ${
        isDragging ? draggingClassName : ""
      }`}
      style={style}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="flex items-center justify-center cursor-move text-gray-400 bg-gray-50"
      >
        <GripHorizontal />
      </div>
      <div className="px-4">
        <div className="flex justify-end mb-2">
          <Select value={currentField.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Short answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short_answer">
                <Text className="inline-block mr-2" />
                Short answer
              </SelectItem>
              <SelectItem value="paragraph">
                <MessageSquare className="inline-block mr-2" />
                Paragraph
              </SelectItem>
              <DropdownMenuSeparator />
              <SelectItem value="multiple_choice">
                <List className="inline-block mr-2" />
                Multiple choice
              </SelectItem>
              <SelectItem value="checkboxes">
                <CheckSquare className="inline-block mr-2" />
                Checkboxes
              </SelectItem>
              <SelectItem value="dropdown">
                <CircleChevronDown className="inline-block mr-2" />
                Dropdown
              </SelectItem>
              <DropdownMenuSeparator />
              <SelectItem value="file_upload">
                <FileUp className="inline-block mr-2" />
                File upload
              </SelectItem>
              <DropdownMenuSeparator />
              <SelectItem value="linear_scale">
                <SlidersVertical className="inline-block mr-2" />
                Linear scale
              </SelectItem>
              <SelectItem value="rating">
                <Star className="inline-block mr-2" />
                Rating
              </SelectItem>
              <SelectItem value="multiple_choice_grid">
                <Grip className="inline-block mr-2" />
                Multiple choice grid
              </SelectItem>
              <SelectItem value="checkbox_grid">
                <Grid className="inline-block mr-2" />
                Checkbox grid
              </SelectItem>
              <DropdownMenuSeparator />
              <SelectItem value="date">
                <Calendar className="inline-block mr-2" />
                Date
              </SelectItem>
              <SelectItem value="time">
                <Timer className="inline-block mr-2" />
                Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="Short answer text"
          className="mb-2 border-0 drop-shadow-none border-b-1 border-secondary focus:border-0 focus:ring-0 rounded-none focus:drop-shadow-none"
          value={currentField.name}
          onChange={handleQuestionChange}
        />

        {renderQuestionType()}

        <div className="flex justify-end items-center mt-2">
          <div className="flex items-center">
            <Copy className="mr-2" />
            <Trash2 className="mr-2" onClick={() => setIsRemoveDialogOpen(true)} />
            <Separator orientation="vertical" className="h-2" />
            <Label htmlFor="required" className="text-sm mr-2">
              Required
            </Label>
            <Switch
              id="required"
              checked={currentField.required}
              onCheckedChange={handleRequiredChange}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                <DropdownMenuLabel>Show</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderDropdown()}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this question?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsRemoveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}