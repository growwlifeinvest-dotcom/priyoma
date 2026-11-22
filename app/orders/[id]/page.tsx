"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";

interface OrderItem {
  id: string;
  product: { name: string; price: number };
  quantity: number;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${params.id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

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

  if (!order)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
        <p>Order not found</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link href="/orders" className="text-purple-600 hover:underline mb-6">
          ← Back to Orders
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Order #{order.id.slice(0, 8)}
          </h1>

          {/* Order Status */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <div>
              <p className="text-gray-600 text-sm">Order Date</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className="text-lg font-bold text-purple-600">{order.status}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Payment</p>
              <p className="text-lg font-bold text-green-600">
                {order.paymentStatus}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-purple-600">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span>₹{order.totalAmount}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-purple-600 pt-4 border-t border-gray-200">
              <span>Total:</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Shipping Address
            </h3>
            <p className="text-gray-700">{order.shippingAddress}</p>
          </div>

          {/* Order Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Order Timeline
            </h3>
            <div className="space-y-3">
              {["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"].map(
                (status, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"].indexOf(
                          order.status
                        ) >= idx
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      ✓
                    </div>
                    <span className="font-semibold text-gray-800">{status}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
