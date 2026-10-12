import { DashboardShell } from "@/components/dashboard-shell";
import { UserBillingContent } from "@/components/dashboard-pages";

export default function UserBillingPage() {
  return (
    <DashboardShell role="user" page="billing">
      <UserBillingContent />
    </DashboardShell>
  );
}
