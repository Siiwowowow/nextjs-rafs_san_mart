import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-300 shadow-md p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Dashboard Menu</h2>
      <ul className="menu">
        <li>
          <Link href="/dashboard/add-product" className="flex items-center gap-2 btn btn-ghost">
            {/* SVG icon for "Add Product" */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add Product</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
