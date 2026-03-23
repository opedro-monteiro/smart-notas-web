import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="">
      <h1 className="text-xl">
        Bem Vindo, <span className="font-bold">{user?.fullName}</span>
      </h1>
    </div>
  );
}
