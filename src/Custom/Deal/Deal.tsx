"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { GetDeal } from "@/app/APi/ApiSaleCode";

export default function Deals() {
  const router = useRouter();
  const [saleCodes, setSaleCodes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSaleCodes() {
      const response = await GetDeal(); // Replace with your API endpoint

      setSaleCodes(response);
    }

    fetchSaleCodes();
  }, []);

  return (
    <div className="bg-gray-100 p-5 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-5">Các ưu đãi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {saleCodes.map((sale: any) => (
            <div
              key={sale.code}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={sale.image}
                alt={sale.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex">
                <div className="w-[50%]">
                  <h2 className="text-lg font-bold mb-2">{sale.title}</h2>
                  <h2 className=" font-bold mb-2">áp dụng</h2>
                  <p className="text-gray-600 text-sm mb-1">
                    Từ: {sale.dateStart}
                  </p>
                  <p className="text-gray-600 text-sm">
                    đến hết: {sale.dateEnd}
                  </p>
                </div>
                <div className="flex w-[50%] justify-end items-center">
                  {" "}
                  <Button onClick={() => router.push(`/USER/Deal/${sale.id}`)}>
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
