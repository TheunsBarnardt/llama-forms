"use client";

import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor, KeyboardSensor, closestCenter, Dragging } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import QuestionItem, { Question } from "./question-item.component";
import { File, ImageIcon, PlaySquare, Text } from "lucide-react";

// Load EditorJS dynamically
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";

interface QuestionsProps {
  id: string;
}

const initialQuestion: Question = {
  id: "1",
  questionText: "Untitled Question",
  questionType: "short_answer",
  options: [],
  required: false,
};

export function Questions(prop: QuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([initialQuestion]);
  const [formDescription, setFormDescription] = useState<OutputBlockData<string, { text: string }>[]>([]);

  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  // Set up sensors for dragging
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // Handle drag end event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: { active: any; over: any; }) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = questions.findIndex((question) => question.id === active.id);
      const newIndex = questions.findIndex((question) => question.id === over?.id);

      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(oldIndex, 1);
        updatedQuestions.splice(newIndex, 0, prevQuestions[oldIndex]);
        return updatedQuestions;
      });
    }
  };

  useEffect(() => {
    if (!editorRef.current && editorContainerRef.current) {
      const editor = new EditorJS({
        holder: editorContainerRef.current,
        placeholder: "Form description...",
        autofocus: true,
        minHeight: 40,
        tools: {
          header: Header,
        },
        data: {
          blocks: formDescription,
        },
        async onChange() {
          const output = await editor.save();
          setFormDescription(output?.blocks?.[0]?.data?.text || "");
        },
      });

      editorRef.current = editor;
    }

    return () => {
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, []);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: String(questions.length + 1),
      questionText: "Untitled Question",
      questionType: "short_answer",
      options: [],
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="pt-4 w-6xl mx-auto">
      <div className="rounded-lg bg-background p-4 mb-4 border-t-8 border-t-fuchsia-700">
        <div>
          <h1 className="text-2xl font-bold">Blank Quiz</h1>
          <div ref={editorContainerRef} className="mt-2 border p-2 rounded min-h-[50px] pb-0" />
        </div>
      </div>

      <DndContext 
        sensors={sensors} 
        onDragEnd={handleDragEnd} 
        collisionDetection={closestCenter}
      >
        <SortableContext items={questions.map((question) => question.id)} strategy={verticalListSortingStrategy}>
          <div className="mb-4">
            {questions.map((question) => (
              <QuestionItem 
                key={question.id} 
                question={question} 
                id={question.id} 
                // Apply CSS Utility for the dragged item
                draggingClassName="dragging"  // Add this class for dragging
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center bg-background p-4 rounded-lg shadow-lg">
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
