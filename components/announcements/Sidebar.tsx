"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedFields: string[];
  onFieldsChange: (fields: string[]) => void;
  badges: string[];
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  searchTerm,
  onSearchChange,
  selectedFields,
  onFieldsChange,
  badges,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const [expandedField, setExpandedField] = useState<string | null>("برمجه");

  const categories = [
    {
      id: "fields",
      label: "الاشغال والمجالات",
      items: [
        {
          name: "برمجه",
          subitems: ["ويب", "تصميم مواقع", "انشاء موقع الكتروني"],
        },
        {
          name: "تطوير جرافيك",
          subitems: ["ويب", "تصميم مواقع", "انشاء موقع الكتروني"],
        },
        {
          name: "تصميم",
          subitems: ["ويب", "تصميم مواقع", "انشاء موقع الكتروني"],
        },
        {
          name: "تصوير فيديو",
          subitems: ["ويب", "تصميم مواقع", "انشاء موقع الكتروني"],
        },
        {
          name: "الصوتيات",
          subitems: ["ويب", "تصميم مواقع", "انشاء موقع الكتروني"],
        },
        "الترجمة",
        "تسويق",
        "حسابات التواصل الاجتماعي",
        "برامج مايكروسوفت اوفيس",
        "عروض برزنتيشن",
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 right-0 h-screen lg:h-auto w-56 sm:w-60 md:w-64 lg:w-72 bg-white border-l border-border transform transition-transform duration-300 z-40 lg:z-0 overflow-y-auto flex flex-col shrink-0 max-w-[80vw] lg:max-w-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Close Button (Mobile) */}
        <div className="md:hidden flex items-center justify-between p-3 md:p-4 border-b border-border">
          <h2 className="font-bold text-gray-dark text-sm md:text-base">الفلاتر</h2>
          <button
            onClick={onClose}
            className="text-gray-medium hover:text-gray-dark"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

    <div>
        <p className="pr-3 md:pr-4 font-bold text-xs md:text-sm">البحث باسم المشتغل </p>
    </div>

        {/* Search Input */}
        <div className="p-3 md:p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute right-3 top-3 text-gray-medium w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pr-10 pl-4 py-2 md:py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-xs md:text-sm text-right"
              dir="rtl"
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex-1 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border-b border-border last:border-b-0"
            >
              {/* Category Header - Static */}
              <div className="w-full flex items-center justify-between p-3 md:p-4">
                <span className="text-gray-dark font-bold text-xs md:text-sm flex items-center gap-2">
                  {category.label}
                </span>
              </div>

              {/* Category Items - Always Visible */}
              <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-2">
                {category.items.map((item) => {
                  const isObject =
                    typeof item === "object" &&
                    item !== null &&
                    "subitems" in item;
                  const itemName = isObject ? item.name : item;

                  return isObject ? (
                    <div key={itemName} className="space-y-2">
                      {/* Parent Item with Toggle */}
                      <button
                        onClick={() =>
                          setExpandedField(
                            expandedField === itemName ? null : itemName,
                          )
                        }
                        className="w-full flex items-center gap-3 cursor-pointer hover:bg-bg p-2 rounded transition-colors text-left"
                      >
                        <label
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-3 flex-1"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFields.includes(itemName)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                onFieldsChange([...selectedFields, itemName]);
                              } else {
                                onFieldsChange(
                                  selectedFields.filter((f) => f !== itemName),
                                );
                              }
                            }}
                            className="w-4 h-4 text-primary rounded cursor-pointer"
                          />
                          <span className="text-xs md:text-sm text-gray-dark font-medium">
                            {itemName}
                          </span>
                        </label>
                        <svg
                          className={`w-4 h-4 text-gray-medium transition-transform ${
                            expandedField === itemName ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </button>

                      {/* Sub Items */}
                      {expandedField === itemName && (
                        <div className="pr-4 md:pr-6 space-y-2">
                          {item.subitems.map((subitem: string) => (
                            <label
                              key={subitem}
                              className="flex items-center gap-3 cursor-pointer hover:bg-bg p-2 rounded transition-colors text-xs md:text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFields.includes(subitem)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    onFieldsChange([
                                      ...selectedFields,
                                      subitem,
                                    ]);
                                  } else {
                                    onFieldsChange(
                                      selectedFields.filter(
                                        (f) => f !== subitem,
                                      ),
                                    );
                                  }
                                }}
                                className="w-4 h-4 text-primary rounded cursor-pointer"
                              />
                              <span className="text-sm text-gray-dark">
                                {subitem}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <label
                      key={itemName}
                      className="flex items-center gap-3 cursor-pointer hover:bg-bg p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFields.includes(itemName)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onFieldsChange([...selectedFields, itemName]);
                          } else {
                            onFieldsChange(
                              selectedFields.filter((f) => f !== itemName),
                            );
                          }
                        }}
                        className="w-4 h-4 text-primary rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-dark font-medium">
                        {itemName}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Clear Filters Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              onSearchChange("");
              onFieldsChange([]);
            }}
            className="w-full px-4 py-2 bg-bg text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            مسح جميع الفلاتر
          </button>
        </div>
      </aside>
    </>
  );
}
