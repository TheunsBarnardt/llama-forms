"use server";

import form_dal from "@/lib/DataAccessLayer/forms";
import { Form } from "@/prisma/interfaces";

export async function getForm(id:number) {
    try {
      const response = form_dal.get ? await form_dal.get(id) : undefined;
  
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

  
export async function editForm(form: Form) {
  try {
    const response = form_dal.edit ? await form_dal.edit(form) : undefined;

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