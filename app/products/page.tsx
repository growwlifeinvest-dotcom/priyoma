"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: { id: string; name: string };
  stock: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const fetchCategoriesAndProducts = async () => {
    try {
      setLoading(true);
      const [categoriesRes, productsRes] = await Promise.all([
        axios.get("/api/categories"),
        axios.get("/api/products"),
      ]);
      setCategories(categoriesRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category.id === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">The Priyoma Candle World</h1>
          <p className="text-purple-100">Shop candles by shape, fragrance, occasion and emotion</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Filters</h3>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-3">
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search candles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      !selectedCategory
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded transition ${
                        selectedCategory === cat.id
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </main>
      
      <Footer />
    </div>
  );
}
