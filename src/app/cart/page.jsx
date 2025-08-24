"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CartPage() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchCart = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/api/cart?email=${userEmail}`);
      const data = await res.json();
      if (data.success) {
        setCartItems(data.items);
        const qtyObj = {};
        data.items.forEach((item) => {
          qtyObj[item._id] = item.quantity;
        });
        setQuantities(qtyObj);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userEmail]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
      fetchCart();
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    const quantity = quantities[selectedItem._id];
    if (quantity < 1) return;

    try {
      await fetch(`/api/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedItem._id, quantity }),
      });
      fetchCart();
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      setModalOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!userEmail) return <p>Please log in to see your cart.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Color</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const quantity = quantities[item._id] || item.quantity;
                const totalPrice = (item.price * quantity).toFixed(2); // dynamic price
                return (
                  <tr key={item._id} className="border">
                    <td className="p-3 border">{item.name}</td>
                    <td className="p-3 border">{item.color}</td>
                    <td className="p-3 border">
                      <input
                        
                        value={quantity}
                        min={1}
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            [item._id]: Number(e.target.value),
                          })
                        }
                        className="border text-center p-1 rounded w-16"
                      />
                    </td>
                    <td className="p-3 border font-semibold">${totalPrice}</td>
                    <td className="p-3 border flex gap-2">
                      <button
                        onClick={() => openUpdateModal(item)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Update Quantity</h2>
            <p className="mb-2">{selectedItem.name}</p>
            <input
              type="number"
              value={quantities[selectedItem._id]}
              min={1}
              onChange={(e) =>
                setQuantities({
                  ...quantities,
                  [selectedItem._id]: Number(e.target.value),
                })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <p className="font-semibold mb-4">
              Total: ${(selectedItem.price * quantities[selectedItem._id]).toFixed(2)}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
