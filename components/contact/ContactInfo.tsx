import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 m-4 sm:m-6 md:m-8 lg:m-12">
      <h2 className="text-2xl font-bold text-dark mb-6">معلومات التواصل</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-dark mb-1">البريد الإلكتروني</h3>
            <p className="text-gray-600">info@shogol.com</p>
            <p className="text-gray-600">support@shogol.com</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-dark mb-1">الهاتف</h3>
            <p className="text-gray-600" dir="ltr">+966 50 123 4567</p>
            <p className="text-gray-600" dir="ltr">+966 12 345 6789</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="bg-primary/10 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-dark mb-1">العنوان</h3>
            <p className="text-gray-600">
              شارع الملك فهد، حي النخيل<br />
              الرياض، المملكة العربية السعودية<br />
              الرمز البريدي: 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
