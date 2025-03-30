import { NextResponse } from "next/server";
import { IDataAccessLayer } from "./IDataAccessLayer";
import { NextSuccess, NextError } from "./ResponseHelper";
import { db } from "../db";
import { cache } from "react";
import { Question } from "@/prisma/interfaces";

const question_dal: IDataAccessLayer<Question> = {
  count: cache(async (id: number): Promise<NextResponse<number>> => {
    debugger;
    const data = await db.question.count({
      where: { formId: id },
    });
    return NextSuccess.OK(data);
  }),
  load: cache(async (id: number): Promise<NextResponse<Question[]>> => {
      const data = await db.question.findMany({
        where: { formId: id },
      });
      return NextSuccess.OK(data);
    }),
  get: cache(async (id: number): Promise<NextResponse<Question> | NextResponse> => {
    try {
      const data = await db.question.findUnique({
        where: { id },
      });

      if (!data) {
        return NextError.NotFound("Record not found");
      }
      return NextSuccess.Created(data);
    } catch (error) {
      return NextError.BadRequest(error instanceof Error ? error.message : 'An error occurred');
    }
  }),

  edit: async (data: Question): Promise<NextResponse> => {
    try {
      // Update the form and its associated questions
      const updated = await db.question.update({
        where: { id: data.id },
        data: {
          name: data.name,
          description: data.description,
          type: data.type,
          required : data.required,
          changeDate: new Date(),
        }
      });

      if (!updated) {
        return NextError.BadRequest("Failed to update the form");
      }

      return NextSuccess.OK(updated);
    } catch (error) {
      return NextError.BadRequest(error instanceof Error ? error.message : 'An error occurred');
    }
  },

  create: async (data: Question): Promise<NextResponse<Question> | NextResponse> => {
    try {
      const insert = await db.question.create({
        data: {
          name: "Untitled question",
          type: "short_answer",
          required: false,
          createDate: new Date(),
          changeDate: new Date(),
          form: {
            connect: { id: data.formId }, // Assuming `data.formId` contains the ID of the associated form
          },
        },
        },
      );

      if (!insert) {
        return NextError.BadRequest("An error occurred while creating your form.");
      }

      return NextSuccess.Created(insert);
    } catch (error) {
      return NextError.BadRequest(error instanceof Error ? error.message : 'An error occurred');
    }
  },

  delete: async (id: number): Promise<NextResponse> => {
    try {
      // Delete the form and its associated questions
      const deletedForm = await db.question.delete({
        where: { id },
      });

      if (!deletedForm) {
        return NextError.NotFound("Form not found");
      }

      return NextSuccess.OK(id);
    } catch (error) {
      return NextError.BadRequest(error instanceof Error ? error.message : 'An error occurred');
    }
  },
};

export default question_dal;
