"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [popup, setPopup] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.email || !formData.password) {
      showPopup(false, "Email dan password wajib diisi!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showPopup(false, "Email tidak valid!");
      return;
    }

    // Simulasi login
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Contoh email/password benar
      if (
        formData.email === "fathan@gmail.com" &&
        formData.password === "123456"
      ) {
        showPopup(true, "Login berhasil! Selamat datang.");
        router.push("/beranda");
      } else {
        showPopup(false, "Email atau password salah!");
      }
    }, 1500);
  };

  const showPopup = (success, message) => {
    setPopup({ show: true, success, message });
    setTimeout(() => {
      setPopup({ show: false, success, message: "" });
    }, 3000);
  };

  return (
    <section className='relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white text-center mb-6'>
          Masuk ke <span className='text-rose-500'>Dravora</span>
        </h1>

        <form
          className='flex flex-col gap-4'
          onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-300 mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='email@domain.com'
              className='px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-sm text-gray-300 mb-1'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='********'
              className='px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='mt-4 bg-rose-600 hover:bg-rose-700 transition-all text-white py-3 rounded-full font-medium shadow-lg shadow-rose-500/30 disabled:opacity-50'>
            {loading ? "Menunggu..." : "Masuk"}
          </button>

          <p className='text-sm text-gray-400 text-center mt-3 hover:text-rose-500 cursor-pointer transition'>
            Lupa password?
          </p>
        </form>
      </motion.div>

      {/* Popup Notifikasi */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium ${
              popup.success ? "bg-green-500" : "bg-red-500"
            }`}>
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoginPage;
