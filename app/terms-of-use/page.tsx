import TermsOfUseContent from "@/components/terms-of-use/TermsOfUseContent";
import HelpCenterLayout from "@/components/help-center/HelpCenterLayout";

const TermsOfUsePage = () => {
  return (
    <HelpCenterLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        <TermsOfUseContent />
      </div>
    </HelpCenterLayout>
  );
};

export default TermsOfUsePage;
