"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBoxOpen,
  FaUsers,
  FaBars,
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaChartBar,
  FaTags,
  FaStore,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const { user, isLoaded: clerkLoaded } = useUser();

  // Fetch user role from MongoDB when Clerk user is loaded
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users?clerkId=${user.id}`);
        if (response.ok) {
          const users = await response.json();
          // Find the current user in the users array
          const currentUser = users.find(u => u.clerkId === user.id);
          setUserRole(currentUser?.role || "user");
        } else {
          console.error("Failed to fetch user role");
          setUserRole("user");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("user");
      } finally {
        setLoading(false);
      }
    };

    if (clerkLoaded) {
      fetchUserRole();
    }
  }, [user?.id, clerkLoaded]);

  // Sidebar links grouped by role
  const links = [
    {
      role: "admin",
      items: [
        { href: "/dashboard/admin", label: "Admin", icon: <FaUsers /> },
        { href: "/dashboard/admin/overview", label: "Overview", icon: <FaChartBar /> },
        { href: "/dashboard/admin/users", label: "Manage Users", icon: <FaUsers /> },
        { href: "/dashboard/admin/products", label: "Manage Products", icon: <FaBoxOpen /> },
        { href: "/dashboard/admin/orders", label: "All Orders", icon: <FaClipboardList /> },
      ],
    },
    {
      role: "seller",
      items: [
        { href: "/dashboard/seller", label: "Seller", icon: <FaBoxOpen /> },
        { href: "/dashboard/seller/overview", label: "Overview", icon: <FaChartBar /> },
        { href: "/dashboard/seller/products", label: "My Products", icon: <FaBoxOpen /> },
        { href: "/dashboard/seller/orders", label: "My Orders", icon: <FaClipboardList /> },
        { href: "/dashboard/seller/add-product", label: "Add Product", icon: <FaTags /> },
      ],
    },
    {
      role: "user",
      items: [
        { href: "/dashboard/user", label: "User", icon: <FaUser /> },
        { href: "/dashboard/user/profile", label: "My Profile", icon: <FaUser /> },
        { href: "/dashboard/user/orders", label: "My Orders", icon: <FaShoppingCart /> },
        { href: "/dashboard/user/wishlist", label: "Wishlist", icon: <FaTags /> },
        { href: "/dashboard/user/store", label: "Browse Store", icon: <FaStore /> },
      ],
    },
  ];

  // Filter links based on user role
  const userLinks = links.find(section => section.role === userRole)?.items || [];

  if (!clerkLoaded || loading) {
    return (
      <div className={`flex flex-col h-screen bg-base-200 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}>
        <div className="p-4">
          <div className="skeleton h-6 w-6"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="loading loading-spinner loading-md"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`flex flex-col h-screen bg-base-200 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}>
        <div className="p-4">
          <div className="skeleton h-6 w-6"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-error text-xs">Please sign in</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-screen bg-base-200 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        className="p-4 text-xl hover:bg-base-300 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Links for current user role */}
      <nav className="flex-1 mt-4 overflow-y-auto">
        <div className="mb-6">
          {open && (
            <h3 className="px-4 text-xs font-bold text-gray-500 uppercase mb-2">
              {userRole} Dashboard
            </h3>
          )}
          {userLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 p-3 my-1 rounded-md hover:bg-base-300 transition-colors ${
                pathname === link.href ? "bg-primary text-white" : ""
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {open && <span className="font-medium">{link.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer/Profile */}
      <div className="p-4 border-t border-base-300">
        {open ? (
          <div>
            <p className="text-sm">E-commerce Dashboard</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            <p className="text-xs text-gray-400 truncate">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        ) : (
          <FaStore className="text-lg mx-auto" />
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;