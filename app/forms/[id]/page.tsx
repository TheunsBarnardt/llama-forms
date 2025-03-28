"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./settings.component";
import { Responses } from "./responses.component";
import { Questions } from "./questions.component";
import product from "./../../../_resources/productdata.json";
import QuestionRender from './question-render.component';
import { Question } from "../../types/question.type";


export default function Page(question : Question) {
  
  console.log("Selected Quotation:", question);
  return (
    <div className="">
      <Tabs defaultValue="questions" className=" w-full ">
        <TabsList className="w-full p-0  bg-background justify-center border-b rounded-none h-14">
          <TabsTrigger
            value="questions"
            className="rounded-none bg-background h-full data-[state=active]:shadow-none  border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="responses"
            className="rounded-none bg-background h-full data-[state=active]:shadow-none  border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
          >
            Responses
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-none bg-background h-full data-[state=active]:shadow-none  border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
          >
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="rounded-none bg-background h-full data-[state=active]:shadow-none  border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <Questions {...question} />
        </TabsContent>
        <TabsContent value="responses">
          <Responses data={product} />
        </TabsContent>
        <TabsContent value="settings">
          <Settings id={question.id} />
        </TabsContent>
        <TabsContent value="preview">
          <QuestionRender {...question} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
