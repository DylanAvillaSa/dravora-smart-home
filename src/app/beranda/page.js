"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Menu, QrCode } from "lucide-react";
import QRCode from "@/components/QRCode";
import Link from "next/link";

const products = [
  {
    id: "d01-dcam",
    name: "D01 Ccam Basic",
    description:
      "D01 Ccam Basic adalah kamera pintar pertama dari Dravora. Versi awal ini fokus pada kemudahan penggunaan dan live streaming di rumah, meski kualitasnya belum setara CCTV profesional. Cocok untuk pengawasan sederhana dan mencoba pengalaman kamera pintar pertama Anda.",
    image: "/products/d01-basic.png",
    link: "/produk",
  },
];

// Produk yang sudah dibeli user

const HomePage = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = "Dravors 😁";

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">
          <span className="text-rose-500">Dravora</span> Smart Home
        </h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-md rounded-md shadow-lg py-2 flex flex-col"
              >
                <span className="px-4 py-2 text-sm text-gray-300 font-semibold">
                  Hai, {userName}
                </span>
                <button
                  className="px-4 py-2 text-sm hover:bg-gray-800 transition text-white text-left"
                  onClick={() => router.push("/manual-book")}
                >
                  Manual Book
                </button>
                <button
                  className="px-4 py-2 text-sm hover:bg-gray-800 transition text-white text-left"
                  onClick={() => router.push("/auth/login")}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Selamat Datang di <span className="text-rose-500">Dravora</span>
        </h1>
        <p className="text-gray-300 max-w-md mb-6">
          Kendalikan rumah anda dengan mudah dan aman. Produk kami hadir dengan
          teknologi pintar terbaru untuk kenyamanan dan keamanan.
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto overflow-hidden">
        {products.map((product, index) => {
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 relative `}
              onClick={() => product.link && router.push(product.link)}
            >
              <Image
                src={product.image}
                width={150}
                height={150}
                className="rounded-md scale-[3] mx-auto relative left-5"
                alt={product.name}
              />
              <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-400 text-justify text-sm mt-2">
                {product.description}
              </p>

              <Link
                href={product.link}
                className="mt-4 bg-rose-600 hover:bg-rose-700 transition-all text-white px-6 py-2 rounded-full shadow-md 
              shadow-rose-500/30"
              >
                Akses Produk
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;
