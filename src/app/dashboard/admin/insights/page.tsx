import { DashboardShell } from "@/components/dashboard-shell";
import { AdminInsightsContent } from "@/components/dashboard-pages";

export default function AdminInsightsPage() {
  return (
    <DashboardShell role="admin" page="insights">
      <AdminInsightsContent />
    </DashboardShell>
  );
}
