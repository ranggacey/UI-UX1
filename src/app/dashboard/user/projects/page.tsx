import { DashboardShell } from "@/components/dashboard-shell";
import { UserProjectsContent } from "@/components/dashboard-pages";

export default function UserProjectsPage() {
  return (
    <DashboardShell role="user" page="projects">
      <UserProjectsContent />
    </DashboardShell>
  );
}
