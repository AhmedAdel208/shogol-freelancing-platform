"use client";

import { Button } from "@/container/reusable/form";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 m-4 sm:m-6 md:m-8 lg:m-12 border border-gray-200 rounded-lg p-4 shadow-sm ">
      <h2 className="text-2xl font-bold text-dark mb-6">أرسل رسالة</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6  m-4 sm:m-6 md:m-8 lg:m-12 ">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full hover:shadow-sm hover:border-primary hover:shadow-primary/20  transition-shadow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="أدخل اسمك الكامل"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full hover:shadow-sm hover:border-primary hover:shadow-primary/20  transition-shadow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            الموضوع
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full hover:shadow-sm hover:border-primary hover:shadow-primary/20  transition-shadow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="أدخل موضوع الرسالة"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            الرسالة
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full hover:shadow-sm hover:border-primary hover:shadow-primary/20  transition-shadow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
            placeholder="اكتب رسالتك هنا..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-primary to-primary/90 via-primary/100 hover:shadow-sm hover:border-primary cursor-pointer transition-shadow bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
        </Button>
      </form>
    </div>
  );
}
