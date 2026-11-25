"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { Package } from "lucide-react";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PACKED":
        return "bg-purple-100 text-purple-800";
      case "SHIPPED":
        return "bg-indigo-100 text-indigo-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet</p>
            <Link
              href="/products"
              className="text-purple-600 font-bold hover:underline"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="text-lg font-bold text-gray-800">{order.id.slice(0, 8)}...</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="text-lg font-bold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Amount</p>
                    <p className="text-lg font-bold text-purple-600">₹{order.totalAmount}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Status</p>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Payment Status</p>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded mb-4">
                  <p className="text-gray-600 text-sm">Shipping Address</p>
                  <p className="text-gray-800">{order.shippingAddress}</p>
                </div>

                <Link
                  href={`/orders/${order.id}`}
                  className="text-purple-600 font-bold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      </main>
      <Footer />
    </>
  );
}
