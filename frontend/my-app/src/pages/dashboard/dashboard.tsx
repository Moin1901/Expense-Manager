import UploadCSV from "./components/uploadCsv/uploadcsv";
import AddExpense from "./components/addExpense/addExpense";
import Analytics from "./components/analytics/analytics";

export default function Dashboard() {
  return (
    <div>
      <h1>Expense Manager</h1>
      <AddExpense />
      <UploadCSV />
      <Analytics />
    </div>
  );
}
