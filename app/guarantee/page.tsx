import GuaranteeYourRightsContent from "@/components/guarantee/GuaranteeYourRightsContent";
import HelpCenterLayout from "@/components/help-center/HelpCenterLayout";

const GuaranteePage = () => {
  return (
    <HelpCenterLayout>
      <div className="min-h-screen bg-transparent text-white overflow-x-hidden">
        <GuaranteeYourRightsContent />
      </div>
    </HelpCenterLayout>
  );
};

export default GuaranteePage;
