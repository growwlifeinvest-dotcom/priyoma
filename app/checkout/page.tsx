"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";

interface OrderItem {
  product: { name: string; price: number };
  quantity: number;
}

export default function CheckoutPage() {
  const { status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      fetchCart();
    }
  }, [status]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.addressLine || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill all fields");
      return;
    }

    setOrdering(true);
    try {
      const shippingAddress = `${formData.addressLine}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
      
      const res = await axios.post("/api/orders", {
        shippingAddress,
      });

      alert("Order placed successfully!");
      router.push(`/orders/${res.data.id}`);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = Math.round(totalPrice * 0.18);
  const finalTotal = totalPrice + tax;

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

  if (cartItems.length === 0)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/products" className="text-purple-600 font-bold">
            ← Back to Shopping
          </Link>
        </div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shipping Address
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address Line
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    required
                    placeholder="House no., street name, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={ordering}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition disabled:bg-gray-400 mt-6"
                >
                  {ordering ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Summary
              </h2>

              <div className="space-y-3 py-4 border-b border-gray-200 max-h-96 overflow-y-auto">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (18%):</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-purple-600 pt-4">
                <span>Total:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
