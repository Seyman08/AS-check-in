import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "@clerk/nextjs/server";
import type { UserResource } from "@clerk/types";

export async function createUserIfNotExists(user: UserResource) {
  if (!user || !user.id) return;

  const ref = doc(db, "users", user.id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, {
      id: user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      email: user.emailAddresses?.[0]?.emailAddress ?? "",
      role: user.publicMetadata?.role || "staff",
      createdAt: serverTimestamp(),
    });
  }
}
