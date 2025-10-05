'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedUserPage({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUserAccess = async () => {
      if (!isLoaded || !user) {
        setChecking(false);
        return;
      }

      try {
        const response = await fetch(`/api/users?clerkId=${user.id}`);
        if (response.ok) {
          const userData = await response.json();

          let actualUser;
          if (Array.isArray(userData)) {
            actualUser = userData.find(u => u.clerkId === user.id);
          } else {
            actualUser = userData;
          }

          if (!actualUser) {
            router.push('/dashboard/unauthorized');
            return;
          }

          const role = actualUser.role;
          setUserRole(role);

          if (role !== 'user') {
            router.push('/dashboard/unauthorized');
          }
        } else {
          router.push('/dashboard/unauthorized');
        }
      } catch (error) {
        console.error('Error checking user access:', error);
        router.push('/dashboard/unauthorized');
      } finally {
        setChecking(false);
      }
    };

    checkUserAccess();
  }, [user, isLoaded, router]);

  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <span className="ml-4">Checking user permissions...</span>
      </div>
    );
  }

  if (!user || userRole !== 'user') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-error"></div>
          <p className="mt-4">Redirecting to unauthorized page...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
