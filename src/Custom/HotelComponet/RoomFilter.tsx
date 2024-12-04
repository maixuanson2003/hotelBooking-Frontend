"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
interface RoomFilterProps {
  onFilter: (filters: {
    features: string[];
    priceStart?: number;
    priceEnd?: number;
    roomType?: string;
  }) => void;
}

const AVAILABLE_FEATURES = [
  "Hoàn hủy miễn phí",
  "Bao gồm ăn sáng",
  "Xác nhận ngay",
  "2 giường đơn",
  "Xuất hóa đơn",
];
const PRICE_OPTIONS = [
  { label: "Chọn giá thấp nhất", value: undefined },
  { label: "Dưới 500,000 VNĐ", value: 500000 },
  { label: "Dưới 1,000,000 VNĐ", value: 1000000 },
  { label: "Dưới 2,000,000 VNĐ", value: 2000000 },
];
export default function RoomFilter({ onFilter }: RoomFilterProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceStart, setPriceStart] = useState<number | undefined>(undefined);
  const [priceEnd, setPriceEnd] = useState<number | undefined>(undefined);

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  const handleFilter = () => {
    onFilter({
      features: selectedFeatures,
      priceStart,
      priceEnd,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex justify-between items-center gap-x-4 space-x-4">
      {/* Bộ lọc tính năng */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Tìm kiếm nhanh:
        </label>
        <div className="flex items-center space-x-4">
          {AVAILABLE_FEATURES.map((feature) => (
            <label key={feature} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="rounded-full text-blue-600"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bộ lọc khoảng giá */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Chọn Khoảng giá:
        </label>
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">Giá từ:</label>
          <select
            value={priceStart}
            onChange={(e) => setPriceStart(Number(e.target.value) || undefined)}
            className="border rounded px-2 py-1"
          >
            {PRICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="text-gray-700">đến:</label>
          <select
            value={priceEnd}
            onChange={(e) => setPriceEnd(Number(e.target.value) || undefined)}
            className="border rounded px-2 py-1"
          >
            {PRICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nút áp dụng bộ lọc */}
      <Button
        onClick={handleFilter}
        className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-pink-600 right-0 "
      >
        Áp dụng bộ lọc
      </Button>
    </div>
  );
}
