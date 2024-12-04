import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface prop {
  Hotel: {
    id: number;
    name: string;
    address: string;
    starPoint: number;
    hotelFacilityList: { nameHotelFacility: string; desCription: string }[];
    hotelPolicyDTOList: {
      namePolicy: string;
      description: string;
      fee: number;
      coditionalInfo: string;
    }[];
    imageList: string[];
  };
}

export function HotelComponet({ Hotel }: prop) {
  const rounter = useRouter();

  if (Hotel) {
  }
  return (
    <div className="flex flex-row border rounded-lg shadow-md p-6 mb-6 gap-x-4 bg-white">
      {/* Image Section */}
      <div className="w-[25%] flex items-center justify-center bg-gray-100 rounded overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={Hotel.imageList[0]}
          alt={Hotel.name}
        />
      </div>

      {/* Content Section */}
      <div className="w-[75%]">
        {/* Hotel Name and Address */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{Hotel.name}</h2>
        <p className="text-gray-600 mb-4">
          <strong>Địa chỉ:</strong> {Hotel.address}
        </p>

        {/* Star Ratings */}
        <div className="flex items-center mb-4">
          <strong className="text-gray-700 mr-2">Đánh giá:</strong>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={
                  index < Hotel.starPoint
                    ? "text-orange-500 text-lg"
                    : "text-gray-300 text-lg"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Tiện ích:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {Hotel.hotelFacilityList.map((facility, index) => (
              <li key={index}>{facility.nameHotelFacility}</li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Chính sách:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {Hotel.hotelPolicyDTOList.map((policy, index) => (
              <li key={index}>{policy.namePolicy}</li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-4">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => rounter.push(`/USER/hotels/${Hotel.id}`)}
          >
            Xem Chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
}
