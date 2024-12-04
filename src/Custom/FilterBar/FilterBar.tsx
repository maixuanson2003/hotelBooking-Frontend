"use client";
import React, { useEffect, useState } from "react";
import { GetAllPolicy } from "@/app/APi/ApiPolicy";
import { GetAllCity } from "@/app/APi/ApiCity";
import { Button } from "@/components/ui/button";

interface Props {
  onFilterChangeRoomRequest: (data: RoomSearch) => void;
}

interface RoomRequest {
  numberPeople: number;
  checkOutDate: string;
  amountRoom: number;
  checkinDate: string;
}
interface RoomSearch {
  hotelPolicy: string[];
  address: string;
  starpoint: number;
  RoomRequest: RoomRequest;
}

export default function FilterBar({ onFilterChangeRoomRequest }: Props) {
  const [starRating, setStarRating] = useState<any>(0); // Star Rating
  const [dataCity, setDataCity] = useState<any[]>([]); // Danh sách city
  const [RoomRequest, setRoomRequest] = useState<RoomRequest>({
    numberPeople: 0,
    checkOutDate: "",
    amountRoom: 0,
    checkinDate: "",
  }); // Yêu cầu đặt phòng
  const [address, setAddress] = useState(""); // Địa chỉ
  const [hotelPolicyList, setHotelPolicyList] = useState<any[]>([]); // Danh sách chính sách khách sạn
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]); // Các chính sách được chọn

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      const policyData = await GetAllPolicy();
      setHotelPolicyList(policyData);
    };

    const fetchCities = async () => {
      const cityData = await GetAllCity();
      setDataCity(cityData);
    };

    fetchData();
    fetchCities();
  }, []);

  // Hàm xử lý thay đổi input
  const handleStarRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let number: any = 0;
    if (e.target.value == "ALL") {
      number = 0;
    } else {
      number = Number(e.target.value);
    }
    setStarRating(number);
  };

  const handleRoomRequestChange = (key: keyof RoomRequest, value: any) => {
    setRoomRequest((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress(e.target.value);
  };

  const handlePolicyChange = (policy: string) => {
    setSelectedPolicies((prev) =>
      prev.includes(policy)
        ? prev.filter((p) => p !== policy)
        : [...prev, policy]
    );
  };

  const handleApplyFilters = () => {
    const data: RoomSearch = {
      hotelPolicy: selectedPolicies,
      address: address,
      starpoint: starRating,
      RoomRequest: RoomRequest,
    };
    console.log(data);

    onFilterChangeRoomRequest(data);
  };

  return (
    <div className="p-4 rounded-lg shadow-md space-y-4">
      {/* Star Rating */}
      <div>
        <label className="block text-gray-700">Star Rating:</label>
        <select
          onChange={handleStarRatingChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value={0}>ALL</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>

      {/* Số lượng phòng */}
      <div>
        <label htmlFor="amountRoom" className="block text-sm font-medium">
          Số lượng phòng:
        </label>
        <input
          type="number"
          id="amountRoom"
          className="w-full p-2 mt-1 border rounded"
          value={RoomRequest.amountRoom}
          onChange={(e) =>
            handleRoomRequestChange("amountRoom", Number(e.target.value))
          }
        />
      </div>

      {/* Số lượng người */}
      <div>
        <label className="block text-gray-700">Số lượng người:</label>
        <select
          value={RoomRequest.numberPeople}
          onChange={(e) =>
            handleRoomRequestChange("numberPeople", Number(e.target.value))
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value={0}>All</option>
          {Array.from({ length: 16 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Check-in */}
      <div>
        <label htmlFor="checkinDate" className="block text-sm font-medium">
          Check-in
        </label>
        <input
          type="date"
          id="checkinDate"
          className="w-full p-2 mt-1 border rounded"
          value={RoomRequest.checkinDate}
          onChange={(e) =>
            handleRoomRequestChange("checkinDate", e.target.value)
          }
        />
      </div>

      {/* Check-out */}
      <div>
        <label htmlFor="checkOutDate" className="block text-sm font-medium">
          Check-out
        </label>
        <input
          type="date"
          id="checkOutDate"
          className="w-full p-2 mt-1 border rounded"
          value={RoomRequest.checkOutDate}
          onChange={(e) =>
            handleRoomRequestChange("checkOutDate", e.target.value)
          }
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-700">Address:</label>
        <select
          value={address}
          onChange={handleAddressChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select an address</option>
          {dataCity?.map((city, index) => (
            <option key={index} value={city.nameCity}>
              {city.nameCity}
            </option>
          ))}
        </select>
      </div>

      {/* Hotel Policies */}
      <div>
        <label className="block text-gray-700 mb-2">Hotel Policies:</label>
        {hotelPolicyList &&
          hotelPolicyList.map((policy, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={policy.nameHotelPolicy}
                checked={selectedPolicies.includes(policy.nameHotelPolicy)}
                onChange={() => handlePolicyChange(policy.nameHotelPolicy)}
                className="mr-2"
              />
              <label className="text-gray-700">{policy.nameHotelPolicy}</label>
            </div>
          ))}
      </div>

      {/* Apply Filters Button */}
      <Button
        onClick={handleApplyFilters}
        className="w-full p-2 mt-4 rounded-md"
      >
        Apply Filters
      </Button>
    </div>
  );
}
