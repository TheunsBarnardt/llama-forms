"use client";

import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor, KeyboardSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import QuestionDesignItem from "./question-design-item.component";
import { File, ImageIcon, PlaySquare, Text } from "lucide-react";
import { Form, Question } from "@/prisma/interfaces";
import { addQuestion } from "./actions";
import { getForm, editForm } from "../actions";
import { Input } from "@/components/ui/input";

export function Forms({ id }: { id: number }) {
  const [form, setForm] = useState<Form | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getForm(id);
      setForm(response);
      if (response) {
        setQuestions(response.questions || []);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: { active: any; over: any; }) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = questions.findIndex((field) => field.id === active.id);
      const newIndex = questions.findIndex((field) => field.id === over?.id);

      setQuestions((prevField) => {
        const updatedField = [...prevField];
        updatedField.splice(oldIndex, 1);
        updatedField.splice(newIndex, 0, prevField[oldIndex]);
        return updatedField;
      });
    }
  };

  const handleAddQuestion = useCallback(async () => {
    try {
      if (!form) {
        console.error("Form is undefined. Cannot add question.");
        return;
      }
      const newQuestionData = await addQuestion(form.id);

      if (newQuestionData) {
        setQuestions((prevQuestions) => [...prevQuestions, newQuestionData]);
      } else {
        console.error("Failed to add question.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }, [form?.id]);

  const handleQuestionDelete = (deletedQuestionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== deletedQuestionId)
    );
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const newTitle = e.target.value;
    const updatedForm = { ...form, title: newTitle };
    setForm(updatedForm);
    await editForm(updatedForm);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="pt-4 w-6xl mx-auto">
      <div className="rounded-lg bg-background p-4 mb-4 border-t-8 border-t-fuchsia-700">
        <div>
          {isEditingTitle && form ? (
            <Input
              ref={titleInputRef}
              value={form.title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
            />
          ) : (
            <h1 className="text-2xl font-bold cursor-pointer" onClick={handleTitleClick}>
              {form?.title}
            </h1>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={questions.map((field) => field.id)} strategy={verticalListSortingStrategy}>
          <div className="mb-4">
            {questions.map((field) => (
              <QuestionDesignItem
                key={field.id}
                field={field}
                id={field.id.toString()}
                draggingClassName="dragging"
                onDelete={handleQuestionDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center bg-background p-4 rounded-lg shadow-lg">
        <Button variant="ghost" size="icon" className="mb-2" onClick={handleAddQuestion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-right"><rect width="7" height="10" x="15" y="2" rx="2" /><path d="M15 22v-10" /><path d="M3 6h9" /><path d="M3 12h9" /><path d="M3 18h9" /></svg>
        </Button>
      </div>
    </div>
  );
}