import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";

export default function HelpContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">هل تحتاج مساعدة إضافية؟</h2>
        <p className="text-gray-600">فريق الدعم الخاص بنا هنا لمساعدتك</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">طرق التواصل</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">البريد الإلكتروني</h4>
                <p className="text-gray-600">support@shogol.com</p>
                <p className="text-sm text-gray-500">نرد خلال 24 ساعة</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-green-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">الهاتف</h4>
                <p className="text-gray-600">+966 50 123 4567</p>
                <p className="text-sm text-gray-500">الأحد - الخميس: 9:00 - 17:00</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">الدردشة الحية</h4>
                <p className="text-gray-600">متاحة الآن</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                  ابدأ الدردشة ←
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">وقت الاستجابة</h4>
                <p className="text-gray-600">البريد: 24 ساعة</p>
                <p className="text-gray-600">الدردشة: فوري</p>
                <p className="text-gray-600">الهاتف: خلال ساعات العمل</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">أرسل لنا رسالة</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="موضوع رسالتك"
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
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
