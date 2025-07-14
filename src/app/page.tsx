import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p>Welcome to Apeke Stitches Check-in! Click here to get started</p>
      <br />
      <br />
      <div>
        <Link href="/sign-in" className="underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
