"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: { name: string; id: string };
}

export default function ProductDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${params.id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      alert("Please login to add items to cart");
      return;
    }

    setAdding(true);
    try {
      await axios.post("/api/cart/add", {
        productId: product?.id,
        quantity,
      });
      alert("Added to cart!");
      setQuantity(1);
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
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

  if (!product)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <Link href="/products" className="text-purple-600 hover:underline mb-6">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
            />
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-purple-600 font-semibold text-sm uppercase">
              {product.category.name}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 mt-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">(0 reviews)</span>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <div className="text-4xl font-bold text-purple-600">
                ₹{product.price}
              </div>
              <p className="text-gray-600 mt-2">
                {product.stock > 0
                  ? `Only ${product.stock} left in stock`
                  : "Out of stock"}
              </p>
            </div>

            <p className="text-gray-700 mt-8 leading-relaxed">
              {product.description}
            </p>

            {/* Add to Cart */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock === 0}
                className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="text-purple-600">✓</span> 100% natural soy wax
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-600">✓</span> Hand-poured with care
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-600">✓</span> Pure essential oils
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-600">✓</span> Eco-friendly packaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
