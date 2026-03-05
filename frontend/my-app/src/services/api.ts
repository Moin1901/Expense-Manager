import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000".trim() // Ensure no trailing spaces
});

// Expense-related services
export const addExpense = async (data: { date: string; amount: number; vendor: string; description: string; }) => {
  try {
    return await API.post("/expenses/add", data);
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

export const uploadCSV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    return await API.post("/upload", formData);
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw error;
  }
};

// Dashboard-related services
export const getMonthlySummary = async () => {
  try {
    return await API.get("/dashboard/monthly");
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    throw error;
  }
};

export const getTopVendors = async () => {
  try {
    return await API.get("/dashboard/vendors");
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    throw error;
  }
};

export const getAnomalies = async () => {
  try {
    return await API.get("/dashboard/anomalies");
  } catch (error) {
    console.error("Error fetching anomalies:", error);
    throw error;
  }
};