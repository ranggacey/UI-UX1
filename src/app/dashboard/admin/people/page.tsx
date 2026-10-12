import { DashboardShell } from "@/components/dashboard-shell";
import { AdminPeopleContent } from "@/components/dashboard-pages";

export default function AdminPeoplePage() {
  return (
    <DashboardShell role="admin" page="people">
      <AdminPeopleContent />
    </DashboardShell>
  );
}
