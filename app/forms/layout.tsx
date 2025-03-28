"use client";

import { FormTopNav } from "./form-top-nav.component";

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <div className="flex flex-col h-screen bg-indigo-50">
     <FormTopNav />

      <main className="flex-grow overflow-y-auto w-6xl mx-auto pt-4 ">
        {children}
      </main>
    </div>
  );
}