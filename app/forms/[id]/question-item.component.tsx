import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

export interface Question {
  id: string;
  questionText: string;
  questionType:
    | "short_answer"
    | "paragraph"
    | "multiple_choice"
    | "checkboxes"
    | "dropdown"
    | "file_upload"
    | "linear_scale"
    | "rating"
    | "multiple_choice_grid"
    | "checkbox_grid"
    | "date"
    | "time";
  options?: string[];
  required: boolean;
}

export default function QuestionItem({ question }: { question: Question }) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(question);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentQuestion({ ...currentQuestion, questionText: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionType: value as Question["questionType"],
    });
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (currentQuestion.options) {
      const newOptions = [...currentQuestion.options];
      newOptions[index] = e.target.value;
      setCurrentQuestion({ ...currentQuestion, options: newOptions });
    }
  };

  const handleRequiredChange = (checked: boolean) => {
    setCurrentQuestion({ ...currentQuestion, required: checked });
  };

  const addOption = () => {
    if (currentQuestion.options) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, ""],
      });
    }
  };

  const removeOption = (index: number) => {
    const newOptions = [...currentQuestion.options!];
    newOptions.splice(index, 1);
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const renderQuestionType = () => {
    switch (currentQuestion.questionType) {
      case "short_answer":
        return <ShortAnswer />;
      case "paragraph":
        return <Textarea placeholder="Paragraph text" className="mb-2" />;
      case "multiple_choice":
        return (
          currentQuestion.options?.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="radio" id={`option-${index}`} className="mr-2" />
              <Input
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                className="flex-grow"
              />
              <button
                onClick={() => removeOption(index)}
                className="ml-2 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )) ?? (
            <button onClick={addOption} className="text-blue-500">
              Add option
            </button>
          )
        );
      case "checkboxes":
        return (
          currentQuestion.options?.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <Checkbox id={`option-${index}`} className="mr-2" />
              <Input
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                className="flex-grow"
              />
              <button
                onClick={() => removeOption(index)}
                className="ml-2 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )) ?? (
            <button onClick={addOption} className="text-blue-500">
              Add option
            </button>
          )
        );
      case "dropdown":
        return (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
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
      // Prevent the dropdown menu from closing when the checkbox is clicked
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
    switch (currentQuestion.questionType) {
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

        return <div>Rating (Not implemented)</div>;
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
    }
  };

  return (
    <div className="flex flex-col border p-4 mb-4 gap-2 border-l-6 border-l-blue-500  bg-background rounded-lg">
      <div className="flex justify-end mb-2">
        <Select
          value={currentQuestion.questionType}
          onValueChange={handleTypeChange}
        >
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
        value={currentQuestion.questionText}
        onChange={handleQuestionChange}
      />

      {renderQuestionType()}

      <div className="flex justify-end items-center mt-2">
        <div className="flex items-center">
          <Copy className="mr-2" />
          <Trash2 className="mr-2" />
          <Separator orientation="vertical" className="h-2" />
          <Label htmlFor="required" className="text-sm mr-2">
            Required
          </Label>
          <Switch
            id="required"
            checked={currentQuestion.required}
            onCheckedChange={handleRequiredChange}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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
  );
}
