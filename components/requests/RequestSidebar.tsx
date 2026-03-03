"use client";

import { useState } from "react";
import { 
  FileText, 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  User, 
  Bell, 
  MessageSquare 
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  count?: number;
}

const sidebarItems: SidebarItem[] = [

  {
    id: "pending",
    label: "بانتظار الموافقة",
    icon: Clock,
    href: "/requests/pending",
    count: 0
  },
  {
    id: "in-progress",
    label: "قيد التنفيذ",
    icon: PlayCircle,
    href: "/requests/in-progress"
  },
  {
    id: "completed",
    label: "المكتملة",
    icon: CheckCircle,
    href: "/requests/completed"
  },
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
    href: "/notifications",
    count: 3
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
}

export default function RequestSidebar({ activeItem = "pending", onItemClick }: RequestSidebarProps) {
  return (
    <div className="w-70 bg-white border-gray-200 rounded-2xl shadow-lg shadow-gray-200 border-2 border-gray-200 p-2">
      <div className=" flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 space-x-reverse gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-gray-800">عروضي  </h2>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={`w-full cursor-pointer flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isActive  
                        ? "bg-white text-primary" 
                        : "bg-primary text-white"
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
