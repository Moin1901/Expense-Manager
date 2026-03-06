import type { ExpenseInput } from "../models";
import { API } from "./client";

export const addExpense = async (data: ExpenseInput) => {
  try {
    return await API.post("/expenses/add", data);
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};
