import { DashboardShell } from "@/components/dashboard-shell";
import { UserSettingsContent } from "@/components/dashboard-pages";

export default function UserSettingsPage() {
  return (
    <DashboardShell role="user" page="settings">
      <UserSettingsContent />
    </DashboardShell>
  );
}
