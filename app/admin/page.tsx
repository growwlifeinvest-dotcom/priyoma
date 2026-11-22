"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect } from "react";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && (session?.user as any)?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-gray-900 text-white p-6 fixed h-screen">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <Link
              href="/admin"
              className="block px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
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
              className="block px-4 py-2 hover:bg-gray-800 rounded transition"
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <ShoppingCart size={40} className="text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <Package size={40} className="text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <Users size={40} className="text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Revenue</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">₹0</p>
                </div>
                <TrendingUp size={40} className="text-red-500" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/products"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <Package size={48} className="mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Manage Products</h3>
              <p className="text-gray-600 mt-2">Add, edit, or delete products</p>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <ShoppingCart size={48} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Manage Orders</h3>
              <p className="text-gray-600 mt-2">View and update order status</p>
            </Link>

            <Link
              href="/admin/categories"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <TrendingUp size={48} className="mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">
                Manage Categories
              </h3>
              <p className="text-gray-600 mt-2">Add or edit product categories</p>
            </Link>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
