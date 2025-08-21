import dbConnect, { collectionNameObject } from "@/lib/dbConnet";
import Link from "next/link";

// Default items per page
const ITEMS_PER_PAGE = 8;

export default async function ProductPage({ searchParams }) {
  const { page = 1, search = "" } = searchParams || {};
  const pageNumber = parseInt(page);
  
  // Connect to MongoDB
  const productCollection = await dbConnect(collectionNameObject.productCollection);

  // Build search query: match products whose name starts with the search term (first word)
  const searchQuery = search
    ? { name: { $regex: `^${search}\\b`, $options: "i" } } // case-insensitive, first word
    : {};

  // Count total products for pagination
  const totalProducts = await productCollection.countDocuments(searchQuery);

  // Fetch paginated products
  const products = await productCollection
    .find(searchQuery)
    .skip((pageNumber - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .toArray();

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <form method="GET" className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by first word..."
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            {/* Product Image */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="object-contain h-full"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>

              {/* Prices */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-bold text-green-600">
                  ${product.offerPrice ?? product.price}
                </span>
                {product.offerPrice && (
                  <span className="text-sm line-through text-gray-400">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Brand & Rating */}
              <div className="mt-3 flex justify-between items-center text-sm text-gray-600">
                <span>{product.brand}</span>
                <span>⭐ {product.rating}</span>
              </div>

              {/* View Details Button */}
              <Link href={`/product/${product._id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}${search ? `&search=${search}` : ""}`}
              className={`px-4 py-2 rounded-lg border ${
                pageNumber === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
