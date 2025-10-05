// app/dashboard/unauthorized/page.jsx
'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UnauthorizedPage() {
  const { user } = useUser();
  const router = useRouter();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user role for personalized message
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/users?clerkId=${user.id}`);
          if (response.ok) {
            const userData = await response.json();
            setUserRole(userData.role || 'user');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const handleGoToMyDashboard = () => {
    if (userRole === 'admin') {
      router.push('/dashboard/admin');
    } else if (userRole === 'seller') {
      router.push('/dashboard/seller');
    } else {
      router.push('/dashboard/user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="text-center max-w-md">
        <div className="bg-error text-error-content p-8 rounded-lg shadow-lg mb-6">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-2">You don't have permission to access this page.</p>
          {userRole && (
            <p className="text-sm opacity-90">
              Your role: <span className="font-bold capitalize">{userRole}</span>
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={handleGoToMyDashboard}
            className="btn btn-primary w-full"
          >
            Go to My Dashboard
          </button>
          
          <Link href="/dashboard" className="btn btn-outline w-full">
            Main Dashboard
          </Link>
          
          <Link href="/" className="btn btn-ghost w-full">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}