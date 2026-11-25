"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Priyoma home">
            <Image
              src="/images/priyoma-logo.png"
              alt="Priyoma"
              width={64}
              height={64}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-purple-600 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-purple-600 transition">
              Products
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="hover:text-purple-600 transition">
                Admin
              </Link>
            )}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent ml-2 outline-none w-32"
              />
            </div>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingCart size={24} />
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">{session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block py-2 hover:text-purple-600 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 hover:text-purple-600 transition"
            >
              Products
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="block py-2 hover:text-purple-600 transition"
              >
                Admin
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
