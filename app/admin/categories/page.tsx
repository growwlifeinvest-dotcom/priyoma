"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  _count: { products: number };
}

export default function AdminCategoriesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if ((session?.user as any)?.role !== "ADMIN") {
      router.push("/");
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
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

    if (!formData.name) {
      alert("Please enter category name");
      return;
    }

    try {
      await axios.post("/api/categories", {
        name: formData.name,
        description: formData.description,
      });

      alert("Category added successfully!");
      setFormData({ name: "", description: "" });
      setShowForm(false);
      fetchCategories();
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to add category");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      // We'd need to create a DELETE endpoint for categories
      alert("Delete endpoint not implemented yet");
      // await axios.delete(`/api/categories/${categoryId}`);
      // fetchCategories();
    } catch (error) {
      alert("Failed to delete category");
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
              className="block px-4 py-2 hover:bg-gray-800 rounded transition"
            >
              Orders
            </Link>
            <Link
              href="/admin/categories"
              className="block px-4 py-2 bg-purple-600 rounded"
            >
              Categories
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Categories</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-purple-700 transition"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add New Category
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Category Name *
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
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
                  >
                    Add Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Categories Table */}
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-semibold">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {category._count.products} products
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete()}
                          className="text-red-600 hover:bg-red-100 p-2 rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
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
