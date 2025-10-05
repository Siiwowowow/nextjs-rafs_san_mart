"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import Toggle from "./Toggle";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Scroll effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme
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

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Cart count
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/api/cart?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      if (data.success) setCartCount(data.items?.length || 0);
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const updateListener = () => fetchCartCount();
    window.addEventListener("cartUpdated", updateListener);
    return () => window.removeEventListener("cartUpdated", updateListener);
  }, [userEmail]);

  // Active link helper (plain JS - no type annotation!)
  const isActive = (href) =>
    pathname === href
      ? "text-green-800 font-bold underline"
      : "text-base-content";

  // Nav links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <div
      className={`sticky top-0  z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-md shadow-md"
          : "bg-base-100"
      }`}
    >
      <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
       <p>Exclusive Price Drop! Hurry, <span className="underline underline-offset-2">Offer Ends Soon!</span></p>
    </div>
      <div className="navbar shadow-xs w-full mx-auto px-4">
        {/* Mobile menu & logo */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-square">
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
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={isActive(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <label className="cursor-pointer flex items-center gap-3">
                  <span>Light Mode</span>
                  <Toggle checked={theme === "light"} onChange={toggleTheme} />
                </label>
              </li>
            </ul>
          </div>

          <Link href="/" className="text-xl font-bold">
            Rafsanmart
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={isActive(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Theme, Cart, Auth */}
        <div className="navbar-end flex items-center gap-2">
          {/* Desktop theme toggle */}
          <div className="hidden lg:block">
            <Toggle checked={theme === "light"} onChange={toggleTheme} />
          </div>

          {/* Cart */}
          <Link href="/cart" className="btn btn-ghost btn-circle relative">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13l-1.5 6h13l-1.5-6"
                />
              </svg>
              {cartCount > 0 && (
                <span className="badge badge-sm indicator-item">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Auth */}
          {!isSignedIn ? (
            <button
              className="btn btn-outline rounded-2xl"
              onClick={() => window.Clerk.openSignIn()}
            >
              Sign In
            </button>
          ) : (
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
    </div>
  );
}