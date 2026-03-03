import { Briefcase, Clock, TrendingUp, DollarSign } from "lucide-react";

interface StatsCardsProps {
  proposals: any;
  data?: any;
  isClient?: boolean;
}

export default function StatsCards({ proposals, data, isClient = false }: StatsCardsProps) {
  // For clients, use job requests data; for freelancers, use proposals data
  const completedCount = isClient 
    ? data?.jobRequests?.filter((r: any) => r.status === 'Completed')?.length || 0
    : proposals?.proposals?.filter((p: any) => p.status === 'Completed')?.length || 0;
    
  const pendingCount = isClient
    ? data?.jobRequests?.filter((r: any) => r.status === 'Pending')?.length || 0
    : proposals?.proposals?.filter((p: any) => p.status === 'Pending')?.length || 0;
    
  const acceptedCount = isClient
    ? data?.jobRequests?.filter((r: any) => r.status === 'Accepted')?.length || 0
    : proposals?.proposals?.filter((p: any) => p.status === 'Accepted')?.length || 0;
    
  const totalValue = isClient
    ? data?.jobRequests?.reduce((sum: number, r: any) => sum + (r.budget || 0), 0) || 0
    : proposals?.proposals?.reduce((sum: number, r: any) => sum + (r.proposedPrice || 0), 0) || 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">إجمالي الطلبات</p>
            <p className="text-2xl font-bold text-gray-900">
              {completedCount}
            </p>
          </div>
          <div className="bg-blue-100 p-2 rounded-lg">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">قيد الانتظار</p>
            <p className="text-2xl font-bold text-yellow-600">
              {pendingCount}
            </p>
          </div>
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">مقبولة</p>
            <p className="text-2xl font-bold text-green-600">
              {acceptedCount}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">مجموع القيمة</p>
            <p className="text-2xl font-bold text-purple-600">
              ${totalValue}
            </p>
          </div>
          <div className="bg-purple-100 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
