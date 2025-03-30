import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./components/settings.component";
import { Responses } from "./components/responses.component";
import { Forms } from "./components/form-design.component";
import QuestionRender from './components/from-render.component';
import product from "./../../../_resources/productdata.json";
import { Form } from "@/prisma/interfaces";
import { getForm } from "./actions";

interface PageProps {
  params: {
    id: string;
  };
}


export default async function Page({ params: { id } }: PageProps) {
  const formId = Number(id);

  if (isNaN(formId)) {
    return <div>Invalid form ID.</div>;     
  }

  
  const response = await getForm(formId);
  const data: Form | undefined = response;

  return (
    <div className="">
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="w-full p-0 bg-background justify-center border-b rounded-none h-14">
          <TabsTrigger value="questions" className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500">Questions</TabsTrigger>
          <TabsTrigger value="responses" className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500">Responses</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500">Settings</TabsTrigger>
          <TabsTrigger value="preview" className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          {data && <Forms {...data} />}
        </TabsContent>
        <TabsContent value="responses">
          <Responses data={product} />
        </TabsContent>
        <TabsContent value="settings">
          {data && <Settings id={data.id} />}
        </TabsContent>
        <TabsContent value="preview">
          {data && <QuestionRender form={data} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}