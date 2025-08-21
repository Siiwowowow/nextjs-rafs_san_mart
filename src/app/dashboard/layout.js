import DashboardSidebar from "../components/DashboardSidebar";



export const metadata = {
  title: "Dashboard",
  description: "User dashboard for the product store.",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* The sidebar component for dashboard navigation */}
      <div className="w-64 min-h-screen bg-blue-300 shadow-md p-4">
        <DashboardSidebar />
      </div>
      
      
      {/* The main content area for dashboard pages */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
