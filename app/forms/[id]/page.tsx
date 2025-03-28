"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./settings.component";
import { Responses } from "./responses.component";
import { Questions } from "./questions.component";
import { useState, useEffect } from "react";
import QuestionRender from './question-render.component';
import { Question } from '../../types/question.type';
import product from "./../../../_resources/productdata.json";

export default function Page({ searchParams }: { searchParams: { data?: string } }) {
    const [quotation, setQuotation] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (searchParams.data) {
            try {
                const decodedQuotation = JSON.parse(decodeURIComponent(searchParams.data));
                setQuotation(decodedQuotation);
            } catch (error) {
                console.error("Error decoding quotation data:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [searchParams.data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quotation) {
        return <div>Quotation data not found.</div>;
    }

    return (
        <div className="">
            <Tabs defaultValue="questions" className="w-full">
                <TabsList className="w-full p-0 bg-background justify-center border-b rounded-none h-14">
                    <TabsTrigger
                        value="questions"
                        className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
                    >
                        Questions
                    </TabsTrigger>
                    <TabsTrigger
                        value="responses"
                        className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
                    >
                        Responses
                    </TabsTrigger>
                    <TabsTrigger
                        value="settings"
                        className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
                    >
                        Settings
                    </TabsTrigger>
                    <TabsTrigger
                        value="preview"
                        className="rounded-none bg-background h-full data-[state=active]:shadow-none border-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500"
                    >
                        Preview
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="questions">
                    <Questions {...quotation} />
                </TabsContent>
                <TabsContent value="responses">
                    <Responses data={product} />
                </TabsContent>
                <TabsContent value="settings">
                    <Settings id={quotation.id} />
                </TabsContent>
                <TabsContent value="preview">
                    <QuestionRender {...quotation} />
                </TabsContent>
            </Tabs>
        </div>
    );
}