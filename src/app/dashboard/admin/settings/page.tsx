import { DashboardShell } from "@/components/dashboard-shell";
import { AdminSettingsContent } from "@/components/dashboard-pages";

export default function AdminSettingsPage() {
  return (
    <DashboardShell role="admin" page="settings">
      <AdminSettingsContent />
    </DashboardShell>
  );
}
