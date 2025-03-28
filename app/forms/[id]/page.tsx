"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Image as ImageIcon, Text, PlaySquare, File, MoreVertical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from './settings.component';
import { Responses } from './responses.component';
import { Questions } from './questions.component';


interface Props {
  params: {
    id: string;
  };
}


export default function Page({ params }: Props) {
  const { id } = params;

  return (
<div className="p-4">
<Tabs defaultValue="questions" className=" w-full">
  <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
    <TabsTrigger 
	value="questions"
	 className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
	>Questions</TabsTrigger>
    <TabsTrigger 
	value="responses"
	 className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
	>Responses</TabsTrigger>
	<TabsTrigger 
	value="settings"
	 className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
	>Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="questions"><Questions id={id}  /></TabsContent>
  <TabsContent value="responses"><Responses id={id}  /></TabsContent>
  <TabsContent value="settings"><Settings id={id}  /></TabsContent>
</Tabs>
</div>
  );	
}