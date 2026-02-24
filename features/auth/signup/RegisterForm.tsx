import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import SucessRegister from "./SucessRegister";
import { useRegistration } from "@/hooks/auth/useRegistration";
import type { RegisterFormProps } from "@/types/registerForm";

export default function RegisterForm({
  initialAccountType,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    selectedImage,
    setSelectedImage,
    showSuccess,
    setShowSuccess,
    submittedData,
    step,
    nextStep,
    prevStep,
  } = useRegistration({ initialAccountType });

  return (
    <section className="py-12 lg:py-20 bg-bg min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-10 px-8">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-bold transition-colors duration-300 ${step >= 1 ? "text-[#29B1BE]" : "text-gray-300"}`}>
              المعلومات الأساسية
            </span>
            <span className={`text-sm font-bold transition-colors duration-300 ${step >= 2 ? "text-[#6B79B9]" : "text-gray-300"}`}>
              التفاصيل الإضافية
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-[#29B1BE] to-[#6B79B9] transition-all duration-500 ease-out rounded-full"
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 relative overflow-hidden">
          {/* subtle loading overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-50 flex items-center justify-center animate-in fade-in duration-300">
               <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <StepOne 
                register={register}
                errors={errors}
                setSelectedImage={setSelectedImage}
                nextStep={nextStep}
              />
            )}

            {step === 2 && (
              <StepTwo 
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                prevStep={prevStep}
              />
            )}
          </form>

          {/* Login Link */}
          {!isSubmitting && (
            <div className="text-center mt-6">
              <span className="text-gray-medium">لديك حساب بالفعل؟ </span>
              <a
                href="#"
                className="text-primary font-semibold hover:text-accent transition-colors"
              >
                تسجيل الدخول
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <SucessRegister
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        userData={submittedData}
        userImage={selectedImage}
      />
    </section>
  );
}
