"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Save, X, Image as ImageIcon, User, Layers, Share2, Globe, FileText } from "lucide-react";

import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProfile } from "@/hooks/profile/useProfile";
import Loading from "@/common/Loading";
import { toast } from "@/lib/toast";

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    gender: "",
    nationality: "",
    profilePictureUrl: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    if (profile) {
      // Split full name if possible, or just put it all in first name
      const names = (profile.fullName || "").split(" ");
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "";

      setFormData({
        firstName: firstName,
        lastName: lastName,
        bio: profile.bio || "",
        gender: profile.gender || "male", // default or fallback
        nationality: profile.nationality || "egypt",
        profilePictureUrl: profile.profilePictureUrl || "",
        coverImageUrl: profile.coverImageUrl || "",
      });
    }
  }, [profile]);

  if (isLoading) return <Loading />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("تم حفظ التغييرات بنجاح");
    setIsSubmitting(false);
    router.push("/profile");
  };

  return (
    <div className="bg-slate-50/50 min-h-screen w-full font-cairo" dir="rtl">
      <Gradientline />
      <LinksHeader />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative">
          
          <div className="text-center mb-10">
             <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">تعديل الملف الشخصي</h1>
             <div className="h-1.5 w-16 bg-primary rounded-full mx-auto opacity-80" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Cover Image Section */}
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-700 font-cairo flex items-center gap-2">
                <ImageIcon size={18} className="text-slate-400" />
                صورة الغلاف
              </label>
              <div className="relative w-full aspect-[21/9] sm:aspect-[4/1] bg-slate-900 rounded-[24px] overflow-hidden flex items-center justify-center group cursor-pointer border-2 border-slate-100 hover:border-primary/50 transition-colors">
                {formData.coverImageUrl ? (
                   <Image src={formData.coverImageUrl} alt="Cover" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                   <div className="absolute inset-0 bg-slate-900" />
                )}
                <div className="relative z-10 flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-lg border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                   <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Camera size={16} />
                   </div>
                   <span className="font-bold text-slate-800 text-sm">إضافة صورة غلاف</span>
                </div>
              </div>
              <p className="text-center text-slate-400 text-xs font-bold">الأبعاد الموصى بها: 1920x400 بكسل (نسبة 16:9)</p>
            </div>

            <hr className="border-slate-100" />

            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
               <div className="relative group">
                 <div className="w-24 h-24 relative bg-slate-100 rounded-full flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm border border-slate-200">
                    {/* Fallback to Ahmed Adel image or mock if profilePictureUrl is empty, to match the layout perfectly as requested */}
                    <Image 
                      src={formData.profilePictureUrl || "https://github.com/shadcn.png"} 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                    />
                 </div>
                 {/* Camera Overlay Button */}
                 <button 
                    type="button" 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-[#14b8a6] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-teal-600 hover:scale-110 transition-all z-10 cursor-pointer shadow-sm"
                 >
                    <Camera size={14} />
                 </button>
               </div>
               <p className="text-slate-400 text-xs font-bold mt-4 font-cairo opacity-80">اضغط على أيقونة الكاميرا لتغيير الصورة</p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                   <User size={14} className="text-slate-400" />
                   الاسم الأول <span className="text-rose-500">*</span>
                 </label>
                 <input
                   type="text"
                   name="firstName"
                   value={formData.firstName}
                   onChange={handleChange}
                   required
                   className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                   placeholder="الاسم الأول"
                 />
               </div>
               
               <div className="space-y-2">
                 <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                   <User size={14} className="text-slate-400" />
                   الاسم الأخير <span className="text-rose-500">*</span>
                 </label>
                 <input
                   type="text"
                   name="lastName"
                   value={formData.lastName}
                   onChange={handleChange}
                   required
                   className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                   placeholder="الاسم الأخير"
                 />
               </div>
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                <FileText size={14} className="text-slate-400" />
                نبذة عني
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 resize-none leading-relaxed"
                placeholder="اكتب نبذة مختصرة عنك وعن مجالك..."
              />
            </div>

            {/* Select Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                   <Layers size={14} className="text-slate-400" />
                   النوع
                 </label>
                 <select
                   name="gender"
                   value={formData.gender}
                   onChange={handleChange}
                   className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 cursor-pointer appearance-none"
                 >
                   <option value="male">ذكر</option>
                   <option value="female">أنثى</option>
                 </select>
               </div>
               
               <div className="space-y-2">
                 <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                   <Globe size={14} className="text-slate-400" />
                   الجنسية
                 </label>
                 <select
                   name="nationality"
                   value={formData.nationality}
                   onChange={handleChange}
                   className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 cursor-pointer appearance-none"
                 >
                   <option value="egypt">مصر</option>
                   <option value="ksa">السعودية</option>
                   <option value="uae">الإمارات</option>
                   <option value="jordan">الأردن</option>
                   <option value="other">أخرى</option>
                 </select>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 mt-4 border-t border-slate-50">
               <Link
                 href="/profile"
                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4.5 bg-white border-2 border-primary text-primary rounded-2xl font-black text-base hover:bg-primary/5 transition-all active:scale-[0.98]"
               >
                 <X size={18} />
                 إلغاء
               </Link>
               
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4.5 bg-primary text-white rounded-2xl font-black text-base hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group"
               >
                 {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  ) : (
                    <>
                      <Save size={18} className="group-hover:scale-110 transition-transform" />
                      حفظ التغييرات
                    </>
                 )}
               </button>
            </div>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
