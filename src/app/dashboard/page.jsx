"use client";

import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  const metrics = [
    { title: "Total Sales", value: "$12,450", color: "bg-blue-100", icon: "💰" },
    { title: "Total Orders", value: "348", color: "bg-green-100", icon: "📦" },
    { title: "Revenue", value: "$45,210", color: "bg-purple-100", icon: "📈" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", product: "Cool T-shirt", status: "Shipped", date: "2024-08-20" },
    { id: "ORD-002", customer: "Jane Smith", product: "Vintage Camera", status: "Pending", date: "2024-08-19" },
    { id: "ORD-003", customer: "Alice Johnson", product: "Leather Wallet", status: "Delivered", date: "2024-08-18" },
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-col p-4 md:p-6 bg-base-100 min-h-screen">
        {/* Add Product Section */}
        <section className="p-4 md:p-6 bg-base-100 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold text-base-800 mb-4 md:mb-0">
            Ready to add a new product?
          </h2>
          <Link
            href="/dashboard/add-product"
            className="btn bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors text-sm md:text-base text-center"
          >
            Add a New Product
          </Link>
        </section>

        {/* Dashboard Header */}
        <div className="flex flex-col  md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-base-400">Dashboard</h1>
        </div>

        {/* Key Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className={`p-4 md:p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 ${metric.color}`}
            >
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <h2 className="text-sm md:text-lg font-semibold text-gray-700">{metric.title}</h2>
                <span className="text-2xl md:text-3xl">{metric.icon}</span>
              </div>
              <p className="text-2xl md:text-4xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </section>

        {/* Recent Orders */}
        <section className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Recent Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-gray-50">
                <tr>
                  {["Order ID", "Customer", "Product", "Status", "Date"].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-500">{order.customer}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-500">{order.product}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs md:text-sm leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
