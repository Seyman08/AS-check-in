import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="grid h-screen place-items-center">
      <SignUp routing="hash" signInUrl="/sign-in" />
    </div>
  );
}
