export interface MonthlySummary {
  category: string;
  sum: number | string;
}

export interface TopVendor {
  vendor: string;
  total: number | string;
}

export interface Anomaly {
  date: string;
  vendor: string;
  amount: number | string;
  category?: string;
}
