import { useEffect, useState, useMemo, useCallback } from "react";
import {
  getMonthlySummary,
  getTopVendors,
  getAnomalies,
} from "../../../../services";
import type { MonthlySummary, TopVendor, Anomaly } from "../../../../models";
import styles from "./analytics.module.css";
import { STATS_CONFIG } from "../../../../constants/uiConsts";
import CustomStatsCard from "../../../../common/custom-stats-card";

export default function Analytics() {
  const [summary, setSummary] = useState<MonthlySummary[]>([]);
  const [vendors, setVendors] = useState<TopVendor[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const monthly = await getMonthlySummary();
      setSummary(monthly.data);
    } catch (err) {
      console.error("Error fetching monthly summary:", err);
      setError("Failed to load monthly summary. Please try again later.");
    }

    try {
      const top = await getTopVendors();
      setVendors(top.data);
    } catch (err) {
      console.error("Error fetching top vendors:", err);
      setError("Failed to load top vendors. Please try again later.");
    }

    try {
      const anomaly = await getAnomalies();
      setAnomalies(anomaly.data);
    } catch (err) {
      console.error("Error fetching anomalies:", err);
      setError("Failed to load anomalies. Please try again later.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const totalExpense = useMemo(
    () => summary.reduce((acc, item) => acc + Number(item.sum || 0), 0),
    [summary],
  );

  const statItems = useMemo(() => {
    return STATS_CONFIG.map((c:any) => {
      if (c.key === "totalExpenses")
        return { ...c, value: `₹ ${totalExpense}` };
      if (c.key === "topVendors") return { ...c, value: vendors.length };
      if (c.key === "anomalies") return { ...c, value: anomalies.length };
      return { ...c, value: "-" };
    });
  }, [totalExpense, vendors.length, anomalies.length]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Expense Manager Dashboard</h1>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {statItems.map((s) => (
          <CustomStatsCard key={s.key} title={s.label} value={s.value} />
        ))}
      </div>

      <div className={styles.grid}>
        {/* Monthly Summary */}
        <div className={styles.card}>
          <h2>Monthly Category Summary</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Spend</th>
              </tr>
            </thead>

            <tbody>
              {summary.map((item, i) => (
                <tr key={i}>
                  <td>{item.category}</td>
                  <td className={styles.amount}>₹ {item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Vendors */}
        <div className={styles.card}>
          <h2>Top Vendors</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Total Spend</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((item, i) => (
                <tr key={i}>
                  <td>{item.vendor}</td>
                  <td className={styles.amount}>₹ {item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anomalies */}

      <div className={`${styles.card} ${styles.anomalyCard}`}>
        <h2>⚠ Suspicious Expenses</h2>

        {anomalies.length === 0 ? (
          <p className={styles.noData}>No anomalies detected</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>
              {anomalies.map((item, i) => (
                <tr key={i} className={styles.anomalyRow}>
                  <td>{item.date}</td>
                  <td>{item.vendor}</td>
                  <td className={styles.amount}>₹ {item.amount}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
