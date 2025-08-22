"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar with hamburger */}
      <div className="lg:hidden flex items-center justify-between bg-blue-300 p-4 shadow-md">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-ghost btn-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } lg:block w-64 min-h-screen bg-blue-300 shadow-md p-4 space-y-2`}
      >
        <h2 className="text-xl font-semibold mb-4">Dashboard Menu</h2>
        <ul className="menu">
          <li>
            <Link
              href="/dashboard/add-product"
              className="flex items-center gap-2 btn btn-ghost"
            >
              {/* SVG icon for "Add Product" */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Add Product</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
