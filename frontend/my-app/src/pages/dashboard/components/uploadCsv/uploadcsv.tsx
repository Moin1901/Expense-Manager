import { useState } from "react";
import { uploadCSV } from "../../../../services/api";
import styles from "./uploadcsv.module.css";

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await uploadCSV(file);
      alert("CSV Uploaded Successfully");
      setFile(null);
    } catch (err) {
      console.error("Error uploading CSV:", err);
      setError("Failed to upload CSV. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Expenses via CSV</h2>

      <div className={styles.card}>
        {error && <div className={styles.error}>{error}</div>}

        <input
          type="file"
          accept=".csv"
          className={styles.fileInput}
          onChange={(e: any) => setFile(e.target.files[0])}
        />

        {file && <p className={styles.filename}>Selected: {file.name}</p>}

        <button
          className={styles.uploadBtn}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>
    </div>
  );
}
