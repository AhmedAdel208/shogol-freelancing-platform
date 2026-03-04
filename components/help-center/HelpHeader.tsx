"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export default function HelpHeader() {
  const [query, setQuery] = useState("");

  return (
    <div className="">

      {/* Animated Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-black leading-tight mb-6"
        >
          مركز المساعدة
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-blue-100 max-w-2xl mx-auto mb-12"
        >
          كل الإجابات اللي تحتاجها في مكان واحد
        </motion.p>

        {/* Glass Search */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-2xl"></div>

          <div className="relative flex items-center bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl">
            <Search className="mr-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن سؤال..."
              className="w-full py-5 px-4 text-gray-900 bg-transparent outline-none rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}