export const STATS_CONFIG = [
  { key: "totalExpenses", label: "Total Expenses" },
  { key: "topVendors", label: "Top Vendors" },
  { key: "anomalies", label: "Anomalies" },
] as const;

export type StatKey = typeof STATS_CONFIG[number]["key"];

export default STATS_CONFIG;
