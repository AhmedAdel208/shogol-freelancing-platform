"use client";

import logoFooter from "@/public/images/logo-footer.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const columnVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function LinksFooter() {
  return (
    <motion.div variants={columnVariants} className="lg:col-span-1 text-right mt-5">
      <Link href="/">
        <Image
          src={logoFooter}
          alt="شغل"
          width={130}
          height={50}
          className="object-contain -mt-8 mb-4"
        />
      </Link>

      <p className="text-gray-300 text-base font-bold font-cairo leading-relaxed max-w-[200px]">
        منصة احترافية للعمل الحر تربط بين أصحاب المشاريع والمستقلين المحترفين في الوطن العربي.
      </p>
    </motion.div>
  );
}
