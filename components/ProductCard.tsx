"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface ProductProps {
  id: string; // User ID
  name: string;
  price: number;
  imageUrl: string;
  category: { name: string };
  stock: number;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      alert("Please login to add items to cart");
      return;
    }

    if (product.stock === 0) {
      alert("This product is out of stock");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/cart/add", {
        productId: product.id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-purple-600 font-semibold uppercase">
          {product.category.name}
        </p>
        <h3 className="text-lg font-bold text-gray-800 mt-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-purple-600">
              ₹{product.price}
            </p>
            <p className="text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded text-center hover:bg-gray-300 transition"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            {loading ? "..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
