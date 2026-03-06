import { API } from "./client";

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
