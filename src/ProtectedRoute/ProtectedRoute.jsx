'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isSignedIn && openSignIn) {
      // Save the attempted path
      sessionStorage.setItem('redirectAfterLogin', pathname);
      
      // Open the SignIn modal
      openSignIn();
    }
  }, [isSignedIn, pathname, openSignIn]);

  // If not signed in, don’t render children
  if (!isSignedIn) return null;

  return <>{children}</>;
}
