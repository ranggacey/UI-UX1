import { DashboardShell } from "@/components/dashboard-shell";
import { AdminProjectsContent } from "@/components/dashboard-pages";

export default function AdminProjectsPage() {
  return (
    <DashboardShell role="admin" page="projects">
      <AdminProjectsContent />
    </DashboardShell>
  );
}
