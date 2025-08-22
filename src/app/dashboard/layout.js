export const metadata = {
  title: "Dashboard",
  description: "User dashboard for the product store.",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* The sidebar component for dashboard navigation */}
     
      
      
      {/* The main content area for dashboard pages */}
      <main className="flex-1 p-6 bg-base-100">
        {children}
      </main>
    </div>
  );
}
