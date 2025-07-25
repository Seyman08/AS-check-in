"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserIfNotExists } from "@/lib/user";

export default function PostAuthRedirectPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    createUserIfNotExists(user);

    const role = user?.publicMetadata?.role;

    if (role === "admin") {
      router.replace("/admin/");
    } else {
      router.replace("/staff/check-in");
    }
  }, [isLoaded, user, router]);

  return <p className="p-4 text-sm">Redirecting based on role...</p>;
}
