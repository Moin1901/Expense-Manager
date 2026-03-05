import { useState } from "react";
import { addExpense } from "../../../../services/api";
import styles from "./addexpense.module.css";

export default function AddExpense() {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    vendor: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitExpense = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await addExpense({
        ...form,
        amount: Number(form.amount), // Convert amount to number
      });

      alert("Expense Added Successfully");

      setForm({
        date: "",
        amount: "",
        vendor: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding expense:", err);
      setError("Failed to add expense. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Expense</h2>

      <div className={styles.card}>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={submitExpense} className={styles.form}>
          <div className={styles.field}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Vendor</label>
            <input
              type="text"
              name="vendor"
              placeholder="Vendor name (Swiggy, Uber, etc)"
              value={form.vendor}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Expense description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
}
