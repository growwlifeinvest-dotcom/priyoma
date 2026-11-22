"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      fetchCart();
    }
  }, [status]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart", {
        headers: { "x-user-id": (session?.user as any)?.id },
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const res = await axios.put(`/api/cart/${cartItemId}`, {
        quantity: newQuantity,
      });
      const updatedItems = cartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: res.data.quantity } : item
      );
      setCartItems(updatedItems);
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                <Link
                  href="/products"
                  className="text-purple-600 font-bold hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 p-6 flex gap-6 hover:bg-gray-50 transition"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-bold text-gray-800 hover:text-purple-600 transition"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-purple-600 font-bold text-lg mt-2">
                        ₹{item.product.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Summary
                </h2>

                <div className="space-y-2 py-4 border-y border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax:</span>
                    <span>₹{Math.round(totalPrice * 0.18)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-purple-600 pt-4">
                  <span>Total:</span>
                  <span>₹{Math.round(totalPrice + totalPrice * 0.18)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-purple-700 transition block"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="w-full border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-bold text-center hover:bg-purple-50 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
