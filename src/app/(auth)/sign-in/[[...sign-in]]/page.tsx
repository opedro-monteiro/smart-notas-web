import { SignIn } from "@clerk/nextjs";
import { LogoLoader } from "@/components/logo-loader";

export default function SignInPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <SignIn fallback={<LogoLoader size={80} />} />
    </div>
  );
}
