import Image from "next/image";
import contactImg from "@/public/images/contact.png";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="py-4  lg:py-8 bg-white ">
      <div className="max-w-8xl mx-auto px-12">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-18 items-center"
          dir="ltr"
        >
          <div className="order-2 lg:order-1">
            <div className="text-right mb-8">
              <span className="text-primary text-[40px] font-el-missiri mb-2 block">
                معلومات
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#18212E] mb-6 leading-tight">
                نحن نفضل ان نسمع منك؟
              </h2>
              <div className="w-16 h-1 bg-primary mb-2 rounded-full ml-auto" />
              <div className="w-16 h-1 bg-primary mb-6 rounded-full ml-auto mr-3" />
            </div>

            {/* Form */}
            <ContactForm />
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative h-125 lg:h-150 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={contactImg}
                alt="Customer support team"
                fill
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-dark/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
