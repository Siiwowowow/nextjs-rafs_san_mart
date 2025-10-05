import ProtectedSellerPage from "@/app/components/PageProtected/ProtectedSellerPage";

export default function SellerDashboard() {
  return (
    <ProtectedSellerPage>
      <div>Welcome, Seller! This is your dashboard.</div>
    </ProtectedSellerPage>
  );
}
