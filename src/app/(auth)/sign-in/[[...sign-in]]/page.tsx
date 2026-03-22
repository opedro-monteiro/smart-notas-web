import { SignIn } from "@clerk/nextjs";

function Loading() {
  return (
    <div className="bg-red-500">
      <h1>Eae, estoucarregado espera </h1>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="bg-muted flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <SignIn fallback={<Loading />} />
    </div>
  );
}
