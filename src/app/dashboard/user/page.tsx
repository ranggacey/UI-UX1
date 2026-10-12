import { DashboardShell, OverviewContent } from "@/components/dashboard-shell";

export default function UserDashboard() {
  return (
    <DashboardShell role="user" page="overview">
      <OverviewContent role="user" />
    </DashboardShell>
  );
}
