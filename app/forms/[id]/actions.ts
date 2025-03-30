"use server";

import form_dal from "@/lib/DataAccessLayer/forms";

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