"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const IntroductionPage = () => {
  const router = useRouter();
  return (
    <section className='relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden px-4'>
      {/* Background Glow */}
      <div className='absolute inset-0'>
        <div className='absolute w-[400px] h-[400px] bg-rose-700/20 rounded-full blur-2xl -top-16 -left-16 animate-pulse' />
        <div className='absolute w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-2xl -bottom-16 -right-16 animate-pulse delay-2000' />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='z-10'>
        <Image
          src='/icon/dravora.png'
          width={140}
          height={140}
          alt='logo'
        />
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='text-center text-lg md:text-2xl font-semibold mt-4 max-w-xs leading-relaxed'>
        Cara baru untuk <span className='text-rose-500'>mengontrol rumah</span>{" "}
        anda
      </motion.h1>

      {/* Button */}
      <motion.button
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        onClick={() => router.push("/auth/login")}
        className='absolute bottom-6 bg-rose-600 hover:bg-rose-700 transition-all px-6 py-3 rounded-full text-sm font-medium shadow-lg shadow-rose-500/30 min-w-[140px]'>
        Mulai Sekarang
      </motion.button>
    </section>
  );
};

export default IntroductionPage;
