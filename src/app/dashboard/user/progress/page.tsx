import { DashboardShell } from "@/components/dashboard-shell";
import { UserProgressContent } from "@/components/dashboard-pages";

export default function UserProgressPage() {
  return (
    <DashboardShell role="user" page="progress">
      <UserProgressContent />
    </DashboardShell>
  );
}
