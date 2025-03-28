import { useState } from "react";
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { GripVertical, Trash2 } from "lucide-react";
import { Field } from "../../types/field.type";

// Draggable Option Component
function DraggableOption({ option, index, onChange, onRemove }: {
  option: string;
  index: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemove: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center ">
      <span {...attributes} {...listeners} className="cursor-grab mr-2">
        <GripVertical size={16} />
      </span>
      <span id={`option-${index}`} className="mr-2"   >{index + 1}</span>
      <Input value={option} onChange={(e) => onChange(e, index)} className="flex-grow" spellCheck={true}/>
      <button onClick={() => onRemove(index)} className="ml-2 text-red-500">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

// Multiple Choice Component
export function DropdownQuestion(field: Field) {
  const [currentField, setCurrentQuestion] = useState<Field>(field);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...currentField.options!];
    newOptions[index] = e.target.value;
    setCurrentQuestion({ ...currentField, options: newOptions });
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentField,
      options: [...(currentField.options || []), `Option ${(currentField.options?.length || 0) + 1}`],
    });
  };

  const removeOption = (index: number) => {
    const newOptions = [...currentField.options!];
    newOptions.splice(index, 1);
    setCurrentQuestion({ ...currentField, options: newOptions });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCurrentQuestion((prev) => ({
        ...prev,
        options: arrayMove(prev.options!, active.id, over.id),
      }));
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={currentField.options?.map((_, i) => i) || []} strategy={verticalListSortingStrategy}>
         <div className="space-y-2">
            {currentField.options?.map((option, index) => (
              <DraggableOption key={index} option={option} index={index} onChange={handleOptionChange} onRemove={removeOption} />
            ))}
            </div>
        </SortableContext>
      </DndContext>

      <button onClick={addOption} className="text-blue-500">
        Add option
      </button>
    </div>
  );
}
