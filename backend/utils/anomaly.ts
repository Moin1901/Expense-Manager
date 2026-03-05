import pool from "../db/db.ts";

export const checkAnomaly = async (category: string, amount: number) => {
  const result = await pool.query(
    "SELECT AVG(amount) as avg FROM expenses WHERE category=$1",
    [category]
  );

  const avg = result.rows[0].avg || 0;

  if (avg > 0 && amount > 3 * avg) {
    return true;
  }

  return false;
};