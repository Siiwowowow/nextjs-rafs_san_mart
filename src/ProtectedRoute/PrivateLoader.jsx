"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function PrivateLoader({ allowedRoles = [], children }) {
  const { user, isLoaded: clerkLoaded } = useUser();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) {
        router.replace("/signin"); // redirect if not signed in
        return;
      }

      try {
        const res = await fetch(`/api/users?clerkId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch role");
        const users = await res.json();
        const currentUser = users.find(u => u.clerkId === user.id);
        setUserRole(currentUser?.role || "user");

        // If role not allowed, redirect to their default dashboard
        if (!allowedRoles.includes(currentUser?.role)) {
          if (currentUser?.role === "admin") router.replace("/dashboard/admin");
          else if (currentUser?.role === "seller") router.replace("/dashboard/seller");
          else router.replace("/dashboard/user");
        }
      } catch (err) {
        console.error(err);
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    };

    if (clerkLoaded) fetchUserRole();
  }, [user, clerkLoaded, allowedRoles, router]);

  if (loading || !clerkLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}
