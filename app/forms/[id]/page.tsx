"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Image as ImageIcon, Text, PlaySquare, File, MoreVertical } from 'lucide-react';

interface Props {
  params: {
    id: string;
  };
}

interface Question {
  id: string;
  questionText: string;
  questionType: 'short_answer' | 'paragraph' | 'multiple_choice' | 'checkboxes' | 'dropdown' | 'file_upload' | 'linear_scale' | 'rating' | 'multiple_choice_grid' | 'checkbox_grid' | 'date' | 'time';
  options?: string[];
  required: boolean;
}

const initialQuestion: Question = {
  id: '1',
  questionText: 'Untitled Question',
  questionType: 'short_answer',
  options: [],
  required: false,
};

function QuestionComponent({ question }: { question: Question }) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(question);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentQuestion({ ...currentQuestion, questionText: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setCurrentQuestion({ ...currentQuestion, questionType: value as Question['questionType'] });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (currentQuestion.options) {
      const newOptions = [...currentQuestion.options];
      newOptions[index] = e.target.value;
      setCurrentQuestion({ ...currentQuestion, options: newOptions });
    }
  };

  const handleRequiredChange = (checked: boolean) => {
    setCurrentQuestion({ ...currentQuestion, required: checked });
  };

  const renderQuestionType = () => {
    switch (currentQuestion.questionType) {
      case 'short_answer':
        return <Input placeholder="Short answer text" className="mb-2" />;
      case 'paragraph':
        return <Textarea placeholder="Paragraph text" className="mb-2" />;
      case 'multiple_choice':
        return currentQuestion.options?.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input type="radio" id={`option-${index}`} className="mr-2" />
            <Input value={option} onChange={(e) => handleOptionChange(e, index)} className="flex-grow" />
          </div>
        ));
      case 'checkboxes':
        return currentQuestion.options?.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <Checkbox id={`option-${index}`} className="mr-2" />
            <Input value={option} onChange={(e) => handleOptionChange(e, index)} className="flex-grow" />
          </div>
        ));
      case 'dropdown':
        return (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option, index) => (
                <SelectItem key={index} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'file_upload':
        return <Input type="file" className="mb-2" />;
      case 'linear_scale':
        return <div>Linear Scale (Not implemented)</div>;
      case 'rating':
        return <div>Rating (Not implemented)</div>;
      case 'multiple_choice_grid':
        return <div>Multiple Choice Grid (Not implemented)</div>;
      case 'checkbox_grid':
        return <div>Checkbox Grid (Not implemented)</div>;
      case 'date':
        return <Input type="date" className="mb-2" />;
      case 'time':
        return <Input type="time" className="mb-2" />;
      default:
        return <Input placeholder="Short answer text" className="mb-2" />;
    }
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <Textarea value={currentQuestion.questionText} onChange={handleQuestionChange} className="w-3/4" />
        <Select value={currentQuestion.questionType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Short answer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short_answer">Short answer</SelectItem>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="multiple_choice">Multiple choice</SelectItem>
            <SelectItem value="checkboxes">Checkboxes</SelectItem>
            <SelectItem value="dropdown">Dropdown</SelectItem>
            <SelectItem value="file_upload">File upload</SelectItem>
            <SelectItem value="linear_scale">Linear scale</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="multiple_choice_grid">Multiple choice grid</SelectItem>
            <SelectItem value="checkbox_grid">Checkbox grid</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="time">Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderQuestionType()}

      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm">Answer key (0 points)</Button>
        <div className="flex items-center">
          <Trash2 className="mr-2" />
          <Label htmlFor="required" className="text-sm mr-2">Required</Label>
          <Checkbox id="required" checked={currentQuestion.required} onCheckedChange={handleRequiredChange} />
          <MoreVertical className="ml-2" />
        </div>
      </div>
    </div>
  );
}

export default function Page({ params }: Props) {
  const { id } = params;
  const [questions, setQuestions] = useState<Question[]>([initialQuestion]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: String(questions.length + 1),
      questionText: 'Untitled Question',
      questionType: 'short_answer',
      options: [],
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Blank Quiz</h1>
          <Textarea placeholder="Form description" className="mt-2" />
        </div>
        <div>
          <Button variant="outline" size="sm" className="mr-2">Questions</Button>
          <Button variant="outline" size="sm" className="mr-2">Responses</Button>
          <Button variant="outline" size="sm">Settings</Button>
          <span className="ml-4">Total points: 0</span>
        </div>
      </div>

      <div className="mb-4">
        {questions.map((question) => (
          <QuestionComponent key={question.id} question={question} />
        ))}
      </div>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center">
        <Button variant="ghost" size="icon" className="mb-2" onClick={addQuestion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </Button>
        <Button variant="ghost" size="icon" className="mb-2">
          <Text />
        </Button>
        <Button variant="ghost" size="icon" className="mb-2">
          <ImageIcon />
        </Button>
		<Button variant="ghost" size="icon" className="mb-2">
          <PlaySquare />
        </Button>
        <Button variant="ghost" size="icon" className="mb-2">
          <File />
        </Button>
        <Button variant="ghost" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-right"><rect width="7" height="10" x="15" y="2" rx="2"/><path d="M15 22v-10"/><path d="M3 6h9"/><path d="M3 12h9"/><path d="M3 18h9"/></svg>
        </Button>
      </div>
    </div>
  );
}