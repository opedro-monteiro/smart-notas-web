import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  console.log(userId);

  return (
    <div className="mx-auto flex flex-col">
      <h1>Hello, {userId}</h1>
      <p>Welcome, Dashboard</p>
    </div>
  );
}
