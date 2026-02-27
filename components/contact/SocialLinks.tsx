import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function SocialLinks() {
  const socialLinks = [
    {
      name: "فيسبوك",
      icon: Facebook,
      href: "https://facebook.com",
      color: "bg-blue-600",
    },
    {
      name: "تويتر",
      icon: Twitter,
      href: "https://twitter.com",
      color: "bg-sky-500",
    },
    {
      name: "انستغرام",
      icon: Instagram,
      href: "https://instagram.com",
      color: "bg-gradient-to-br from-purple-600 to-pink-500",
    },
    {
      name: "لينكدإن",
      icon: Linkedin,
      href: "https://linkedin.com/company",
      color: "bg-blue-700",
    },
    {
      name: "يوتيوب",
      icon: Youtube,
      href: "https://youtube.com/@shogol",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 m-4 sm:m-6 md:m-8 lg:m-12">
      <h2 className="text-2xl font-bold text-dark mb-6">تابعنا على وسائل التواصل الاجتماعي</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 m-4 sm:m-6 md:m-8 lg:m-12">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 p-4 rounded-lg   transition-all duration-200"
              aria-label={`تابعنا على ${social.name}`}
            >
              <div className={`p-3 rounded-full ${social.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors duration-200">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-center text-sm text-gray-600">
          كن على اطلاع بآخر الأخبار والعروض عبر حساباتنا على وسائل التواصل الاجتماعي
        </p>
      </div>
    </div>
  );
}
