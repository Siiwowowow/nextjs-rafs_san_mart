// app/dashboard/layout.js


import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";
import DashboardSidebar from "../components/DashboardSidebar";
import UserInfo from "../components/UserInfo";


export const metadata = {
  title: "Dashboard",
  description: "User dashboard for the product store.",
};

export default function DashboardLayout({ children }) {
  return (
   <ProtectedRoute>
        <div className="flex">
        <UserInfo />
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-base-100 min-h-screen">{children}</main>
      </div>
   </ProtectedRoute>
    
   
      
    
  );
}