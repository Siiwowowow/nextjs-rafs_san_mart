'use client'

import { useUser, useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser(); // <-- add isLoaded
  const { openSignIn } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait until Clerk finishes loading
    if (isLoaded && !isSignedIn && openSignIn) {
      sessionStorage.setItem('redirectAfterLogin', pathname);
      openSignIn();
    }
  }, [isLoaded, isSignedIn, pathname, openSignIn]);

  if (!isLoaded) return null; // avoid flicker

  if (!isSignedIn) return null;

  return <>{children}</>;
}
