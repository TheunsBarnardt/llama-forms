"use client";

import { FormGridItem } from "./components/form-grid-item.component";
import { Form } from "@/prisma/interfaces";
import { useEffect, useState } from "react";
import { add, load } from "./actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookPlus } from "lucide-react";

export default function Page() {
  const [data, setData] = useState<Form[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await load();
      debugger;
      if (Array.isArray(response)) {
        setData(response);
      }
    }

    fetchData();
  }, []);

  const handleAddClick = async () => {
    try {
      const newForm = await add(); 
      if (newForm && !newForm.errors) {
        setData((prevData) => [...prevData, newForm]);
      } else {
        console.log("error adding");
      }
    } catch (error) {
      console.error("Error adding form:", error);
    }
  };

  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <Card
        className="max-w-xs shadow-none py-0 w-52 h-64 rounded-sm gap-1 cursor-pointer"
        onClick={handleAddClick}
      >
        <CardContent className="p-0 h-40 bg-muted flex items-center justify-center">
          <BookPlus size={100} />
        </CardContent>
        <CardFooter className="flex flex-col px-4">
          <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <span>New Form</span>
          </div>
        </CardFooter>
      </Card>
      {data.map((form: Form) => {
        return <FormGridItem key={form.id} {...form} />;
      })}
    </div>
  );
}