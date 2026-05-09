import { currentUser } from "@clerk/nextjs/server";
import { DashboardKpis } from "@/features/analytics/components/dashboard-kpis";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl">
        Bem Vindo, <span className="font-bold">{user?.fullName}</span>
      </h1>
      <DashboardKpis />
    </div>
  );
}
