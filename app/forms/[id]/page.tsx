import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./settings.component";
import { Responses } from "./responses.component";
import { Forms } from "./form-design.component";
import QuestionRender from './from-render.component';
import { Form } from '../../types/form.type';
import product from "./../../../_resources/productdata.json";
import { use } from 'react'; // Import use from react

function getFormData(id: number) {
    const mockData = {
        id: id,
        thumbnail: "https://placehold.co/150x150",
        title: `Form ${id.toString()}`,
        createDate: "2020-01-01",
        questions: [
            { id: 3, name: "Field 3", type: "short_answer", required: true },
            { id: 4, name: "Field 4", type: "paragraph", required: false },
        ],
        responses: [],
    } as Form;
    console.log("Form data:", mockData);
    return mockData;
}

export default function Page({ params }: { params: { id: string } }) {
    const unwrappedParams = use(Promise.resolve(params)); // unwrap the params promise
    const form = getFormData(parseInt(unwrappedParams.id, 10)); // access id from the unwrapped object.
    console.log("Form ID:", form.id);

    if (!form) {
        return <div>Quotation data not found.</div>;
    }

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