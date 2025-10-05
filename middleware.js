// middleware.js
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/dashboard/admin(.*)',
]);

const isSellerRoute = createRouteMatcher([
  '/dashboard/seller(.*)',
]);

const isUserRoute = createRouteMatcher([
  '/dashboard/user(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = auth();
  
  // If user is not signed in and trying to access protected route
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // If user is signed in, check role-based access
  if (userId) {
    try {
      // Fetch user role from your database
      const response = await fetch(`${req.nextUrl.origin}/api/users?clerkId=${userId}`);
      
      if (response.ok) {
        const userData = await response.json();
        const userRole = userData.role || "user";
        const currentPath = req.nextUrl.pathname;

        console.log(`🛡️ Role Check: ${userRole} trying to access ${currentPath}`);

        // STRICT ROLE PROTECTION:
        
        // If USER tries to access admin/seller routes
        if (userRole === "user" && (isAdminRoute(req) || isSellerRoute(req))) {
          console.log('🚫 User trying to access admin/seller route');
          return NextResponse.redirect(new URL('/dashboard/unauthorized', req.url));
        }

        // If SELLER tries to access admin/user routes  
        if (userRole === "seller" && (isAdminRoute(req) || isUserRoute(req))) {
          console.log('🚫 Seller trying to access admin/user route');
          return NextResponse.redirect(new URL('/dashboard/unauthorized', req.url));
        }

        // If ADMIN tries to access seller/user routes
        if (userRole === "admin" && (isSellerRoute(req) || isUserRoute(req))) {
          console.log('🚫 Admin trying to access seller/user route');
          return NextResponse.redirect(new URL('/dashboard/unauthorized', req.url));
        }

        console.log('✅ Access granted for', userRole);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      // On error, redirect to unauthorized for safety
      return NextResponse.redirect(new URL('/dashboard/unauthorized', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};