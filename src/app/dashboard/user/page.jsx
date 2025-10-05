import ProtectedUserPage from "@/app/components/PageProtected/ProtectedUserPage";

export default function UserDashboard() {
  return (
   <ProtectedUserPage>

     <div>Welcome, User! This is your dashboard.</div>
   </ProtectedUserPage>
    
  );
}
