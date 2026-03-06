import { API } from "./client";

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
