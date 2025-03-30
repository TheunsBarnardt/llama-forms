"use server";

import question_dal from "@/lib/DataAccessLayer/question";
import { Question } from "@/prisma/interfaces";

export async function loadData(id: number) {
  try {
    const response = question_dal.load ? await question_dal.load(id) : undefined;

    if (!response) {
      return { errors: { general: ["Error fetching data"] } };
    }

    if ("json" in response && typeof response.json === "function") {
      const data = await response.json();
      if (data && data.success && data.data) {
        return data.data;
      } else {
        return { errors: { general: ["Error processing response data"] } };
      }
    } else {
      return { errors: { general: ["Error processing response"] } };
    }
  } catch (error) {
    return { errors: { general: [error] } };
  }
}

export async function addQuestion(id: number) {
  try {
debugger;
const maxIdResponse = await question_dal.count(id);
const maxId = maxIdResponse && maxIdResponse.data ? maxIdResponse.data : 0;
const newQuestionId = maxId + 1;

    const newQuestion: Question = {
      id: newQuestionId,
      name: "Untitled Question",
      type: "short_answer",
      required: false,
      options: [],
      description: null,
      validation: null,
      message: null,
      createDate: new Date(),
      changeDate: new Date(),
      formId: id
    };
    const response = question_dal.create ? await question_dal.create(newQuestion) : undefined;
    if (response) {
    if ("json" in response && typeof response.json === "function") {
      const data = await response.json();
      if (data && data.success && data.data) {
        return data.data;
      } else {
        return { errors: { general: ["Error processing response data"] } };
      }
    } else {
      return { errors: { general: ["Error processing response"] } };
    }
  } else {
    return { errors: { general: ["No response from server"] } };
  }
  } catch (error) {
    return { errors: { general: [error] } };
  }

}
export async function deleteQuestion(id: number) {
  try {
    const response = question_dal.delete ? await question_dal.delete(id) : undefined;

    if (response) { // Check if response is defined
      if ("json" in response && typeof response.json === "function") {
        const data = await response.json();
        if (data && data.success) {
          return { success: true };
        } else {
          return { errors: { general: ["Error deleting form"] } };
        }
      } else {
        return { errors: { general: ["Error processing response"] } };
      }
    } else {
      return { errors: { general: ["No response from server"] } }; // Handle undefined response
    }
  } catch (error) {
    return { errors: { general: [error] } };
  }
}

export async function editQuestion(form: Question) {
  try {
    const response = question_dal.edit ? await question_dal.edit(form) : undefined;

    if (response) { // Check if response is defined
      if ("json" in response && typeof response.json === "function") {
        const data = await response.json();
        if (data && data.success && data.data) {
          return data.data;
        } else {
          return { errors: { general: ["Error editing form"] } };
        }
      } else {
        return { errors: { general: ["Error processing response"] } };
      }
    } else {
      return { errors: { general: ["No response from server"] } }; // Handle undefined response
    }
  } catch (error) {
    return { errors: { general: [error] } };
  }
}