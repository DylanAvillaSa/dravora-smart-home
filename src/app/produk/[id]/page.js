"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    id: "D01-Bell",
    name: "Dravora Bell",
    description:
      "Bel pintar untuk rumah anda dengan notifikasi realtime ke smartphone.",
    features: [
      "Notifikasi realtime",
      "Integrasi Smart Home",
      "Desain minimalis",
    ],
    image: "/products/d01-bell.png",
    price: "Rp500.000",
  },
  {
    id: "d01-dcam",
    name: "Dravora CCTV",
    description:
      "Kamera keamanan canggih dengan streaming HD, deteksi gerakan, dan notifikasi realtime.",
    features: [
      "Streaming HD 1080p",
      "Deteksi gerakan & notifikasi",
      "Integrasi Smart Home",
      "Penyimpanan Cloud",
    ],
    image: "/products/cctv.png",
    price: "Rp1.200.000",
  },
];

// Produk yang sudah dibeli user
const userPurchasedProducts = ["D01-Bell", "d01-dcam"];

// URL streaming CCTV
const CCTV_STREAM_URL = "https://streaming-cctv-dummy-url.com/live";

const ProductDynamicPage = () => {
  const params = useParams();
  const productId = params.id;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white bg-black'>
        <h1 className='text-xl'>Produk tidak ditemukan 😢</h1>
      </div>
    );
  }

  const hasAccess = userPurchasedProducts.includes(product.id);

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8'>
        {/* Gambar / Streaming */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='flex-1 flex justify-center md:justify-start'>
          {hasAccess && product.id.toLowerCase() === "d01-dcam" ? (
            <div className='w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-lg'>
              <video
                src={CCTV_STREAM_URL}
                controls
                autoPlay
                className='w-full h-full object-cover'
              />
            </div>
          ) : (
            <Image
              src={product.image}
              width={250}
              height={250}
              alt={product.name}
              className='rounded-xl shadow-lg shadow-rose-500/20'
            />
          )}
        </motion.div>

        {/* Detail Produk */}
        <div className='flex-1 flex flex-col gap-4'>
          <h1 className='text-3xl md:text-4xl font-bold'>{product.name}</h1>
          <p className='text-gray-300'>{product.description}</p>

          <div>
            <h2 className='font-semibold text-lg mt-4 mb-2'>Fitur Utama:</h2>
            <ul className='list-disc list-inside text-gray-300 space-y-1'>
              {product.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <p className='mt-4 text-2xl font-bold text-rose-500'>
            {product.price}
          </p>

          {hasAccess ? (
            product.id.toLowerCase() === "d01-dcam" ? (
              <p className='mt-6 bg-green-600 text-white px-6 py-3 rounded-full text-center font-medium shadow-md shadow-green-500/30 max-w-xs'>
                Akses Streaming CCTV Aktif
              </p>
            ) : (
              <p className='mt-6 bg-green-600 text-white px-6 py-3 rounded-full text-center font-medium shadow-md shadow-green-500/30 max-w-xs'>
                Akses Bell Aktif
              </p>
            )
          ) : (
            <button className='mt-6 bg-rose-600 hover:bg-rose-700 transition-all text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-rose-500/30 max-w-xs'>
              Beli Sekarang
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductDynamicPage;
