"use client";

import Image from "next/image";
import Link from "next/link";
import googleplay from "@/public/images/googleplay.png";
import appstore from "@/public/images/appstore.png";
import FacebookIcon from "@/public/icons/FacebookIcon";
import TwitterIcon from "@/public/icons/TwitterIcon";
import InstagramIcon from "@/public/icons/InstagramIcon";
import LinksFooter from "./LinksFooter";
import Copyright from "./Copywright";
import { useAuth } from "@/hooks/auth/useAuth";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

import { useUiStore } from "@/stores/useUiStore";

export default function Footer() {
  const { isAuthenticated, isMounted } = useAuth();
  const { footerAnimationPlayed, setFooterAnimationPlayed } = useUiStore();

  return (
    <footer className="relative bg-dark text-white overflow-hidden mt-12" dir="rtl">
      {/* Top Gradient Border */}
      <div className="h-4.5 bg-linear-to-r from-[#29B1BE] to-[#6B79B9]" />
      <div className="relative z-10 max-w-8xl mx-auto px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
          variants={footerVariants}
          initial={footerAnimationPlayed ? "visible" : "hidden"}
          whileInView="visible"
          onViewportEnter={() => setFooterAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.15 }}
        >
          <LinksFooter />

          {/* Column 2 - Links */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-black text-xl font-cairo mb-6">روابط</h4>
            <ul className="space-y-4 text-gray-300 text-lg font-bold font-cairo">
              <li><Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
              <li><Link href="/help-center" className="hover:text-primary transition-colors">مركز المساعدة</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-primary transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="/guarantee" className="hover:text-primary transition-colors">ضمان حقوقك</Link></li>
            </ul>
          </motion.div>

          {/* Column 3 - Dynamic Pages */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-black text-xl font-cairo mb-6">صفحات</h4>
            <ul className="space-y-4 text-gray-300 text-lg font-bold font-cairo">
              {isMounted && isAuthenticated ? (
                <>
                  <li><Link href="/profile" className="hover:text-primary transition-colors">ملفي الشخصي</Link></li>
                  <li><Link href="/messages" className="hover:text-primary transition-colors">الرسائل</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/register" className="hover:text-primary transition-colors">تسجيل جديد</Link></li>
                  <li><Link href="/login" className="hover:text-primary transition-colors">تسجيل الدخول</Link></li>
                </>
              )}
              <li><Link href="/requests" className="hover:text-primary transition-colors">تصفح كل الطلبات</Link></li>
              <li><Link href="/workers" className="hover:text-primary transition-colors">تصفح المستقلين</Link></li>
            </ul>
          </motion.div>

          {/* Column 4 - App Download */}
          <motion.div variants={columnVariants} className="text-right">
            <h4 className="text-primary font-bold text-xl mb-4">
              حمل تطبيق شغل
            </h4>
            <div className="space-y-3">
              <a href="#" className="block">
                <Image
                  src={appstore}
                  alt="App Store"
                  width={160}
                  height={55}
                  className="rounded-lg"
                />
              </a>
              <a href="#" className="block">
                <Image
                  src={googleplay}
                  alt="Google Play"
                  width={160}
                  height={55}
                  className="rounded-lg"
                />
              </a>
            </div>
          </motion.div>

          {/* Column 5 - Social */}
          <motion.div variants={columnVariants} className="text-right">
            <h4 className="text-primary font-bold text-xl mb-4">تابعنا</h4>
            <div className="flex items-center justify-start gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <Copyright />
    </footer>
  );
}
