"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreationsGallery from "@/components/CreationsGallery";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Priyoma - The Candle World
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Every candle has a shape. Every fragrance has a feeling.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition"
          >
            Shop Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop By Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Floral Candles",
                emoji: "🌸",
                desc: "Rose, lotus and flower designs",
              },
              {
                name: "Sculptural Candles",
                emoji: "✨",
                desc: "Modern artistic shapes",
              },
              {
                name: "Gift Sets",
                emoji: "🎁",
                desc: "Thoughtful candle gifts",
              },
              {
                name: "Scented Candles",
                emoji: "🪻",
                desc: "Fragrances for every mood",
              },
              {
                name: "Ocean & Gel Candles",
                emoji: "🐚",
                desc: "Inspired by nature",
              },
              {
                name: "Festival Candles",
                emoji: "🪔",
                desc: "Made for celebrations",
              },
            ].map((cat, i) => (
              <Link
                key={i}
                href={`/products`}
                className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-lg text-center hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800">{cat.name}</h3>
                <p className="text-gray-600 mt-2">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CreationsGallery />

      {/* Shop by emotion */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Shop by Emotion
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Find a candle that feels right for the moment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              ["Love", "Rose candles and romantic gift sets", "💕"],
              ["Peace", "Lavender, jasmine and calming fragrances", "🕊️"],
              ["Happiness", "Daisy, sunflower and colourful blooms", "☀️"],
              ["Luxury", "Sculptural forms and elegant pillars", "✨"],
              ["Nature", "Ocean breeze, shells and botanical designs", "🌿"],
              ["Blessings", "Diya, modak and festive celebrations", "🪔"],
            ].map(([name, description, emoji]) => (
              <Link
                key={name}
                href="/products"
                className="border border-purple-100 rounded-xl p-6 text-center hover:border-purple-300 hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                <p className="text-gray-600 mt-2">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Priyoma?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Natural",
                desc: "Made with pure soy wax and essential oils",
              },
              {
                title: "Eco-Friendly",
                desc: "Sustainable packaging and ingredients",
              },
              {
                title: "Fast Delivery",
                desc: "Shipped to your doorstep within 2-3 days",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">
                  {i === 0 && "🌿"}
                  {i === 1 && "♻️"}
                  {i === 2 && "🚚"}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Discover Your Favorite Scent
          </h2>
          <p className="text-lg mb-8 text-purple-100">
            Explore our complete collection of handcrafted candles
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
