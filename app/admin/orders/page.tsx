"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  user: { email: string };
}

export default function AdminOrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((session?.user as any)?.role !== "ADMIN") {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      // Since we don't have a public orders API for admin, we'll fetch from a hypothetical endpoint
      // In production, you'd create a specific admin endpoint
      const res = await axios.get("/api/orders");
      setOrders(res.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(`/api/orders/${orderId}`, {
        status: newStatus,
      });
      alert("Order updated successfully!");
      fetchOrders();
    } catch (error) {
      alert("Failed to update order");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white p-6 fixed h-screen">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <Link
              href="/admin"
              className="block px-4 py-2 hover:bg-gray-800 rounded transition"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="block px-4 py-2 hover:bg-gray-800 rounded transition"
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="block px-4 py-2 bg-purple-600 rounded"
            >
              Orders
            </Link>
            <Link
              href="/admin/categories"
              className="block px-4 py-2 hover:bg-gray-800 rounded transition"
            >
              Categories
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Orders</h1>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No orders yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-mono text-sm">
                        {order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-purple-600 font-bold">
                        ₹{order.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order.id, e.target.value)
                          }
                          className="px-3 py-1 border border-gray-300 rounded"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PACKED">PACKED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            order.paymentStatus === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-blue-600 hover:bg-blue-100 p-2 rounded transition"
                        >
                          <Eye size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
