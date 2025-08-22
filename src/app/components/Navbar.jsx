"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import Toggle from "./Toggle";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isActive = (href) =>
    pathname === href
      ? "text-primary font-semibold underline"
      : "text-base-content";

  const links = (
    <>
      <li>
        <Link href="/" className={isActive("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/product" className={isActive("/product")}>
          Products
        </Link>
      </li>
      <li>
        <Link href="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>
      </li>
      {/* ✅ Add theme toggle inside mobile menu */}
      <li className="lg:hidden">
        <Toggle checked={theme === "light"} onChange={toggleTheme} />
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm px-4 sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden -ml-4">
          <label tabIndex={0} className="btn btn-ghost text-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        <Link href="/" className="text-xl font-bold">
          Rafsanmart
        </Link>
      </div>

      {/* Center (desktop links) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold">{links}</ul>
      </div>

      {/* Right (desktop only) */}
      <div className="navbar-end gap-2 items-center">
        {/* ✅ Desktop theme toggle */}
        <div className="hidden lg:block mt-1">
          <Toggle checked={theme === "light"} onChange={toggleTheme} />
        </div>

        {!isSignedIn && (
          <button
            className="btn btn-outline rounded-2xl"
            onClick={() => window.Clerk.openSignIn()}
          >
            Create Account
          </button>
        )}

        {isSignedIn && (
          <UserButton
            userProfileMode="menu"
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-full",
                userButtonPopover:
                  "bg-base-100 text-base-content rounded-lg shadow-lg",
              },
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
