'use client';

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserInfo() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0]?.emailAddress,
          profileImageUrl: user.profileImageUrl,
          lastLogin: new Date().toISOString(),
        }),
      });
    }
  }, [isSignedIn, user]);

  return null;
}
