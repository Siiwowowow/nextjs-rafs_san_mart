
import dbConnect, { collectionNameObject } from "@/lib/dbConnect";
import Link from "next/link";

export default async function PopularProduct() {
  // ✅ Wait for the collection
  const productCollection = await dbConnect(collectionNameObject.productCollection);

  // 🔹 Limit to 6 products
  const products = await productCollection.find({}).limit(8).toArray();

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-base-100 text-base-100 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
        >
          {/* Product Image */}
          <div className="w-full h-48 bg-base-100 flex items-center justify-center">
            <img
              src={product.image?.[0]}
              alt={product.name}
              className="object-contain h-full"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-base-content truncate">
              {product.name}
            </h2>
            <p className="text-sm text-base-content line-clamp-2">
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
            <div className="mt-3 flex justify-between items-center text-sm text-base-content">
              <span>{product.brand}</span>
              <span>⭐ {product.rating}</span>
            </div>

            {/* Add to cart button */}
            <Link href={'/product'}>
              <button className="mt-4 w-full bg-[#021206] text-white py-2 rounded-lg hover:bg-blue-700 transition">
                view All
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
