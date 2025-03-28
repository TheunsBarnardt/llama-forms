"use client";

import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor, KeyboardSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import QuestionDesignItem from "./question-design-item.component";
import { File, ImageIcon, PlaySquare, Text } from "lucide-react";

// Load EditorJS dynamically
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { Question } from "../../types/question.type";
import { Field } from "../../types/field.type";


export function Questions(question: Question) {
  const [fields, setFields] = useState<Field[]>(question.fields);
  const [formDescription, setFormDescription] = useState<OutputBlockData<string, { text: string }>[]>([]);

  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  // Set up sensors for dragging
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: { active: any; over: any; }) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id); 
      const newIndex = fields.findIndex((field) => field.id === over?.id);  
  
      setFields((prevField) => {
        const updatedField = [...prevField];
        updatedField.splice(oldIndex, 1);
        updatedField.splice(newIndex, 0, prevField[oldIndex]);
        return updatedField;
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
    const newQuestion: Field = {
      id: fields.length + 1,
      name: "Untitled Question",
      type: "short_answer",
      required: false,
      options: [],
    };
    setFields([...fields, newQuestion]);
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
        <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
          <div className="mb-4">
            {fields.map((field) => (
              <QuestionDesignItem 
                key={field.id} 
                field={field} 
                id={field.id.toString()} 
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
