
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";

export default function ContactSection() {
  return (
    <div className="  mx-auto ">
      <div className="text-center bg-linear-to-r from-primary to-primary/90 via-primary/100  rounded-lg shadow-lg border border-gray-200 p-8  mb-12 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">تواصل معنا</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          نحن هنا لمساعدتك. تواصل معنا عبر أي من الوسائل التالية وسنرد عليك في أقرب وقت ممكن
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 container mx-auto ">
        <ContactForm />
        <div className="space-y-8">
          <ContactInfo/>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
