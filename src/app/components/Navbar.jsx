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
        <Link href="/add-product" className={isActive("/add-product")}>Add Product</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left */}
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Product Store
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        {!isSignedIn && (
          <>
            <button className="btn" onClick={() => window.Clerk.openSignIn()}>
              Create Account
            </button>
          </>
        )}

        {isSignedIn && (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-full",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
