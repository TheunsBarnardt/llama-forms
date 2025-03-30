import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./components/settings.component";
import { Responses } from "./components/responses.component";
import { Forms } from "./components/form-design.component";
import QuestionRender from './components/from-render.component';
import product from "./../../../_resources/productdata.json";
import { useEffect, useState } from 'react'; // Import use from react
import { Form } from "@/prisma/interfaces";

export default function Page({ params }: { params: { id: string } }) {
    const [data, setData] = useState<Form[]>([]);
    useEffect(() => {
        async function fetchData() {
          const forms = await getForms();
          setData(forms);
        }
    
        fetchData();
      }, []);
    
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
                    <Forms {...form} />
                </TabsContent>
                <TabsContent value="responses">
                    <Responses data={product} />
                </TabsContent>
                <TabsContent value="settings">
                    <Settings id={form.id} />
                </TabsContent>
                <TabsContent value="preview">
                    <QuestionRender form={form} />
                </TabsContent>
            </Tabs>
        </div>
    );
}