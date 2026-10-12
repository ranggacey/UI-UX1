import { DashboardShell, OverviewContent } from "@/components/dashboard-shell";

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin" page="overview">
      <OverviewContent role="admin" />
    </DashboardShell>
  );
}
