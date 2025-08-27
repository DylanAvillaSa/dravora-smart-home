"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Contoh manual book per produk dengan link PDF
const manuals = [
  {
    product: "Dravora Bell",
    image: "/products/d01-bell.png",
    content:
      "Manual Dravora Bell: Cara instalasi, konfigurasi, dan penggunaan bel pintar.",
    pdf: "/manuals/d01-bell.pdf",
  },
  {
    product: "Dravora CCTV",
    image: "/products/d01-dcam.png",
    content:
      "Manual Dravora CCTV: Cara pasang kamera, streaming live, pengaturan notifikasi, dan penyimpanan cloud.",
    pdf: "/manuals/d01-dcam.pdf",
  },
];

const ManualBookPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-12'>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-3xl md:text-5xl font-bold text-center mb-12'>
        Manual Book
      </motion.h1>

      <div className='max-w-4xl mx-auto flex flex-col gap-6'>
        {manuals.map((manual, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <motion.div
              key={manual.product}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className='bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden'>
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className='flex items-center gap-4 w-full px-6 py-4 focus:outline-none'>
                <img
                  src={manual.image}
                  alt={manual.product}
                  className='w-16 h-16 object-cover rounded-md'
                />
                <span className='text-xl font-semibold'>{manual.product}</span>
                <span className='ml-auto text-rose-500'>
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className='px-6 pb-4 text-gray-300 text-sm overflow-hidden flex flex-col gap-2'>
                <p>{manual.content}</p>
                <a
                  href={manual.pdf}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-center w-max shadow-md shadow-rose-500/30 transition-all'>
                  Download PDF
                </a>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ManualBookPage;
