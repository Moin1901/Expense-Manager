import UploadCSV from "./components/uploadCsv/uploadcsv";
import AddExpense from "./components/addExpense/addExpense";
import Analytics from "./components/analytics/analytics";

const Dashboard = () => {
  return (
    <div>
      <h1>Expense Manager</h1>
      <AddExpense />
      <UploadCSV />
      <Analytics />
    </div>
  );
};

export default Dashboard;
