"use client";

import React from "react";
import { 
  ClipboardList, 
  Hourglass, 
  Rocket, 
  CheckCircle, 
  User, 
  Bell, 
  MessageSquare
} from "lucide-react";

import { useRouter } from "next/navigation";

/**
 * Sidebar types and constants
 */
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  count?: number;
  href?: string;
}

const MAIN_REQUEST_ITEMS: SidebarItem[] = [
  {
    id: "pending",
    label: "بانتظار العروض",
    icon: Hourglass,
  },
  {
    id: "in-progress",
    label: "قيد التنفيذ",
    icon: Rocket,
  },
  {
    id: "completed",
    label: "المكتملة",
    icon: CheckCircle,
  }
];

const ACCOUNT_SETTINGS_ITEMS: SidebarItem[] = [
  {
    id: "profile",
    label: "الحساب الشخصي",
    icon: User,
    href: "/profile"
  },
  {
    id: "notifications",
    label: "الإشعارات",
    icon: Bell,
    href: "/notifications"
  },
  {
    id: "messages",
    label: "الرسائل",
    icon: MessageSquare,
    href: "/messages"
  }
];

interface RequestSidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  counts?: {
    pending?: number;
    inProgress?: number;
    completed?: number;
  };
}

/**
 * Reusable NavItem Component for Sidebar
 */
const NavItem = ({ 
  item, 
  isActive, 
  onClick,
  count
}: { 
  item: SidebarItem; 
  isActive: boolean; 
  onClick: (item: SidebarItem) => void;
  count?: number; 
}) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={() => onClick(item)}
      className={`w-full group flex flex-row-reverse items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 ${
        isActive
          ? "bg-[#dff0f0] text-primary shadow-sm ring-1 ring-primary"
          : "bg-transparent text-gray-400 hover:bg-gray-50/50 hover:text-gray-600"
      }`}
      dir="ltr"
    >
      <div className="flex flex-row-reverse items-center gap-3">
        <Icon 
          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-primary" : "text-gray-400"}`} 
          strokeWidth={isActive ? 2.5 : 2} 
        />
        <span className={`text-sm transition-colors ${isActive ? "text-primary font-black" : "text-gray-400 font-bold"}`}>
          {item.label}
        </span>
      </div>
      
      <div className="flex items-center justify-center">
        {count !== undefined && (
          <span className={`flex items-center justify-center w-[22px] h-[22px] text-[10px] font-black rounded-full shadow-sm transition-all ${
            isActive 
              ? "bg-primary text-white scale-110" 
              : "bg-[#435365] text-white group-hover:bg-primary/80"
          }`}>
            {count}
          </span>
        )}
      </div>
    </button>
  );
};

export default function RequestSidebar({ 
  activeItem = "pending", 
  onItemClick,
  counts = { pending: 0, inProgress: 0, completed: 0 },
  isClient = false
}: RequestSidebarProps & { isClient?: boolean }) {
  const router = useRouter();

  const dynamicItems = MAIN_REQUEST_ITEMS.map(item => {
    if (item.id === 'pending') {
      return {
        ...item,
        label: isClient ? "بانتظار العروض" : "بانتظار الموافقة"
      };
    }
    return item;
  });
  
  const handleItemClick = (item: SidebarItem) => {
    if (item.href) {
      router.push(item.href);
    } else {
      onItemClick?.(item.id);
    }
  };

  const getCount = (id: string) => {
    if (id === 'pending') return counts.pending;
    if (id === 'in-progress') return counts.inProgress;
    if (id === 'completed') return counts.completed;
    return undefined;
  };

  return (
    <aside className="w-full lg:w-85 sticky top-24">
      <div className="bg-white/90 backdrop-blur-2xl rounded-4xl border border-gray-100 shadow-2xl shadow-black/5 overflow-hidden transition-all duration-500">
        
        {/* Section: My Requests */}
        <div className="p-8">
          <div className="flex items-center justify-end gap-4 mb-8 px-4 group">
             <h2 className="text-xl font-black text-gray-800 tracking-tight transition-colors group-hover:text-primary">طلباتي</h2>
             <div className="bg-[#ccdcda]/50 p-2.5 rounded-2xl text-primary shadow-inner transition-transform duration-500 group-hover:rotate-6">
               <ClipboardList className="w-6 h-6" />
             </div>
          </div>
          
          <nav className="space-y-2 flex flex-col items-center w-full">
            {dynamicItems.map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                isActive={item.id === activeItem} 
                onClick={handleItemClick}
                count={getCount(item.id)}
              />
            ))}
          </nav>
        </div>

        {/* Separator Line: Using a solid, high-detail border */}
        <div className="flex justify-center w-full px-10">
           <div className="w-full h-px bg-gray-200 shadow-[0px_0.5px_0px_white]" />
        </div>

        {/* Section: Account Settings */}
        <div className="p-8 pt-6">
          <nav className="space-y-2 flex flex-col items-center w-full">
            {ACCOUNT_SETTINGS_ITEMS.map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                isActive={item.id === activeItem} 
                onClick={handleItemClick}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
