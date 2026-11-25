"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-100 text-purple-800 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/priyoma-logo.png"
              alt="Priyoma"
              width={96}
              height={96}
              className="mb-2"
            />
            <p className="text-purple-700">
              Premium handmade candles for your home
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-purple-700">
              <li>
                <Link href="/" className="hover:text-purple-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-purple-600 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-purple-600 transition">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-purple-700">
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>hello@priyoma.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/priyoma_2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 transition"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 transition"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-300 pt-8 text-center text-purple-700">
          <p>&copy; 2026 Priyoma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
