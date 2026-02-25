"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function PendingPage() {
  const { data, isLoading } = useSWR(
    "https://shogol.runasp.net/api/Offers/my-offers?status=Pending",
    fetcher,
  );
// react query 
  async function fetchData() {
    const resopnse = await fetch(
      "https://shogol.runasp.net/api/Offers/my-offers?status=Pending",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include auth token if needed
        },
        credentials: "include", // If cookies/session needed
      }
    ).then((res) => res.json());
    console.log(resopnse);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!data || data.length === 0)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 mb-6">لا توجد عروض في هذه الفئة</p>
        <Link href="/projects" className="bg-cyan-600 text-white px-6 py-3 rounded-lg">
          تصفح المشاريع
        </Link>
      </div>
    );

  return (
    <div className="space-y-4">
      {data.map((offer: any) => (
        <div key={offer.id} className="p-4 border rounded-xl shadow-sm">
          <h3 className="font-semibold">{offer.projectTitle}</h3>
          <p className="text-gray-500 text-sm">{offer.description}</p>
        </div>
      ))}
    </div>
  );
}
