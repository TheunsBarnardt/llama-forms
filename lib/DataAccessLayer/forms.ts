import { NextResponse } from "next/server";
import { IDataAccessLayer } from "./IDataAccessLayer";
import { NextSuccess, NextError } from "./ResponseHelper";

import { cache } from "react";
import { Form } from "@/prisma/interfaces";
import { db } from "../db";

const form_dal: IDataAccessLayer<Form> = {
  list: cache(async (): Promise<NextResponse<Form[]>> => {
    const data = await db.form.findMany();
    return NextSuccess.OK(data);
  }),
  get: cache(async (id: number): Promise<NextResponse<Form> | NextResponse> => {
    try {
      const data = await db.form.findUnique({
        where: { id },
      });

      if (!data) {
        return NextError.NotFound("Record not found");
      }
      return NextSuccess.OK(data); // Changed to OK from Created, as get should return 200.
    } catch (error) {
      return NextError.BadRequest(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }),

  edit: async (data: Form): Promise<NextResponse> => {
    try {
      // Update the form and its associated questions
      const updatedForm = await db.form.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          changeDate: new Date(),
        },
        include: { questions: true },
      });

      if (!updatedForm) {
        return NextError.BadRequest("Failed to update the form");
      }

      return NextSuccess.OK(updatedForm);
    } catch (error) {
      return NextError.BadRequest(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  },

  add: async (): Promise<NextResponse<Form> | NextResponse> => {
    try {
      const insert = await db.form.create({
        data: {
          thumbnail: "https://placehold.co/150x150",
          title: "Untitled form",
          createDate: new Date(),
          changeDate: new Date(),
          questions: {
            create: [
              {
                type: "short_answer",
                name: "Untitled Question",
                required: true,
                createDate: new Date(),
                changeDate: new Date(),
                description: "",
              },
            ],
          },
        },
        include: { questions: true },
      });

      if (!insert) {
        return NextError.BadRequest(
          "An error occurred while creating your form."
        );
      }

      return NextSuccess.Created(insert);
    } catch (error) {
      return NextError.BadRequest(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  },
  delete: async (id: number): Promise<NextResponse> => {
    try {
      console.log(`Attempting to delete form with ID: ${id}`);
  
      // 1. Delete related questions first
      await db.question.deleteMany({
        where: { formId: id },
      });
  
      // 2. Delete the form
      const deletedForm = await db.form.delete({
        where: { id },
      });
  
      if (!deletedForm) {
        console.log(`Form with ID ${id} not found.`);
        return NextError.NotFound("Form not found");
      }
  
      console.log(`Form with ID ${id} deleted successfully.`);
      return NextSuccess.OK(id);
    } catch (error) {
      console.error(`Error deleting form with ID ${id}:`, error);
      return NextError.BadRequest(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  },
};

export default form_dal;