import NextActionsCard from "../components/NextActionsCard";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Contacts" count={120} />
        <StatsCard title="Active Prospects" count={75} />
        <StatsCard title="Messages Sent" count={350} />
        <StatsCard title="Pending Requests" count={10} />
      </div>
      <NextActionsCard />
    </div>
  );
}

export default Dashboard;
