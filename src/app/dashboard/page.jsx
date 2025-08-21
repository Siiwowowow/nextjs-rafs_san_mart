// app/dashboard/page.js
// This page provides an overview for an e-commerce dashboard.
// It will be wrapped by the dashboard layout component.

"use client";

import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  // Mock data for the overview. In a real app, you would fetch this from your database.
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
      <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
        </div>

        {/* Section for key metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className={`p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 ${metric.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{metric.title}</h2>
                <span className="text-3xl">{metric.icon}</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </section>

        {/* Section for recent orders */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section for a quick call-to-action */}
        <section className="p-6 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Ready to add a new product?</h2>
          <Link href="/dashboard/add-product" className="btn bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-lg font-semibold transition-colors">
            Add a New Product
          </Link>
        </section>
      </div>
    </ProtectedRoute>
  );
}
