"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const isActive = (href) =>
    pathname === href ? "text-blue-500 font-semibold underline" : "text-gray-700";

  const links = (
    <>
      <li>
        <Link href="/" className={isActive("/")}>Home</Link>
      </li>
      <li>
        <Link href="/product" className={isActive("/product")}>Products</Link>
      </li>
      <li>
        <Link href="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#e2e7e3]  shadow-sm px-4 sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        <Link href="/" className="text-xl">
          Rafsanmart
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2 flex items-center">
        {!isSignedIn && (
          <button className="btn btn-outline rounded-2xl" onClick={() => window.Clerk.openSignIn()}>
            Create Account
          </button>
        )}

        {isSignedIn && (
          <UserButton
            userProfileMode="menu"  // Open profile in dropdown menu
            afterSignOutUrl="/"     // Redirect after sign out
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-full",
                userButtonPopover: "bg-white rounded-lg shadow-lg",
              },
              // Add a custom "Dashboard" item
              menuItems: [
                {
                  label: "Dashboard",
                  onClick: () => (window.location.href = "/dashboard"),
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}
