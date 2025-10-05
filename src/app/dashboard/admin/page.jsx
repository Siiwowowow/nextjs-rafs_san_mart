import ProtectedAdminPage from "@/app/components/PageProtected/ProtectedAdminPage";


export default function AdminPage() {
  return (
    <ProtectedAdminPage>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h1>
        
      </div>
    </ProtectedAdminPage>
  );
}