import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const creations = [
  {
    image: "/images/instagram/photo-01.jpg",
    alt: "Assorted handmade flower candles packed in gift boxes",
  },
  {
    image: "/images/instagram/photo-02.jpg",
    alt: "A handmade candle in a glass jar",
  },
  {
    image: "/images/instagram/photo-03.jpg",
    alt: "Colorful flower-shaped candles arranged by hand",
  },
  {
    image: "/images/instagram/photo-04.jpg",
    alt: "A red flower candle with green leaves in a gift box",
  },
  {
    image: "/images/instagram/photo-05.jpg",
    alt: "A white and orange candle gift set",
  },
  {
    image: "/images/instagram/photo-06.jpg",
    alt: "Yellow rose and daisy candles in a gift box",
  },
  {
    image: "/images/instagram/photo-07.jpg",
    alt: "Pink and white flower candles in a presentation box",
  },
  {
    image: "/images/instagram/photo-08.jpg",
    alt: "Decorative lotus-shaped candles on a wooden display",
  },
];

const instagramUrl = "https://www.instagram.com/priyoma_2025/";

export default function CreationsGallery() {
  return (
    <section className="bg-[#fbf7f5] px-4 py-16 md:py-20">
      <div className="container mx-auto">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              From the Priyoma studio
            </p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Made by hand, shared with love
            </h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              A little look at the candles and gift sets Priyoma has been
              creating.
            </p>
          </div>
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-purple-700 hover:text-purple-900"
          >
            See more on Instagram
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {creations.map((creation) => (
            <Link
              key={creation.image}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${creation.alt}. View Priyoma on Instagram`}
              className="group relative aspect-square overflow-hidden rounded-xl bg-purple-100 shadow-sm"
            >
              <Image
                src={creation.image}
                alt={creation.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
