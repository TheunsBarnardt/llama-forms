"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import QuestionItem, { Question } from './question-item.component';
import { File, ImageIcon, PlaySquare, Text } from 'lucide-react';

interface QuestionsProps {
	id: string;
}

const initialQuestion: Question = {
  id: '1',
  questionText: 'Untitled Question',
  questionType: 'short_answer',
  options: [],
  required: false,
};

export function Questions(prop: QuestionsProps) {

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

      </div>

      <div className="mb-4">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
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