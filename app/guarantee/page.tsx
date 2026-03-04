import GuaranteeYourRightsContent from "@/components/guarantee/GuaranteeYourRightsContent";
import HelpCenterLayout from "@/components/help-center/HelpCenterLayout";

const GuaranteePage = () => {
  return (
    <HelpCenterLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        <GuaranteeYourRightsContent />
      </div>
    </HelpCenterLayout>
  );
};

export default GuaranteePage;
