'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedAdminPage({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      console.log('🔍 Starting admin access check...');
      
      if (!isLoaded || !user) {
        console.log('❌ User not loaded or not signed in');
        setChecking(false);
        return;
      }

      try {
        console.log('📡 Fetching user data for clerkId:', user.id);
        const response = await fetch(`/api/users?clerkId=${user.id}`);
        console.log('📊 API Response status:', response.status);
        
        if (response.ok) {
          const userData = await response.json();
          console.log('🎯 Raw user data from API:', userData);
          
          // Handle both array and object responses
          let actualUserData;
          if (Array.isArray(userData)) {
            // If API returns array, find the user in the array
            actualUserData = userData.find(u => u.clerkId === user.id);
            console.log('🔍 Found user in array:', actualUserData);
          } else {
            // If API returns single object
            actualUserData = userData;
          }
          
          if (!actualUserData) {
            console.log('❌ User data not found');
            router.push('/dashboard/unauthorized');
            return;
          }
          
          const role = actualUserData.role;
          console.log('🎭 User role:', role);
          
          setUserRole(role);
          
          if (role !== 'admin') {
            console.log('🚫 User is NOT admin, redirecting to unauthorized');
            router.push('/dashboard/unauthorized');
          } else {
            console.log('✅ User is ADMIN, access granted');
          }
        } else {
          console.log('❌ API call failed');
          router.push('/dashboard/unauthorized');
        }
      } catch (error) {
        console.error('💥 Error checking admin access:', error);
        router.push('/dashboard/unauthorized');
      } finally {
        setChecking(false);
        console.log('🏁 Finished checking');
      }
    };

    checkAdminAccess();
  }, [user, isLoaded, router]);

  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <span className="ml-4">Checking admin permissions...</span>
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-error"></div>
          <p className="mt-4">Redirecting to unauthorized page...</p>
        </div>
      </div>
    );
  }

  console.log('🎉 Rendering admin content for user:', user.firstName);
  return <>{children}</>;
}