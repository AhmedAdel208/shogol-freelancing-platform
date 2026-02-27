import { Building2, User } from "lucide-react";

export const accountTypes = [
  {
    id: "client",
    icon: Building2,
    title: "حساب عميل",
    description:
      "لأصحاب المشاريع والشركات الذين يبحثون عن موظفين مستقلين محترفين",
    iconBg: "bg-gray-300",
    iconColor: "text-primary",
  },
  {
    id: "freelancer",
    icon: User,
    title: "حساب مستقل",
    description:
      "للمستقلين والموظفين المستقلين الذين يبحثون عن فرص عمل ومشاريع",
    iconBg: "bg-gray-300",
    iconColor: "text-primary",
  },
];
