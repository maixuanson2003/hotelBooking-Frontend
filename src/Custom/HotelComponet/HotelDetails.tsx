"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetHotelDetail } from "@/app/APi/ApiHotel";
import HotelRoom from "./HotelRoom";

import Preview from "./Preview";

interface Room {
  typeRoom: string;
  status: string;
  numberPeople: number;
  pricePerNight: number;
  image: string;
  amount: number;
}

interface HotelDetailsType {
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
}
const hotelFacilityList = [
  {
    nameHotelFacility: "Wi-Fi miễn phí",
    desCription:
      "Kết nối Internet tốc độ cao miễn phí trong toàn bộ khu vực khách sạn.",
  },
  {
    nameHotelFacility: "Hồ bơi",
    desCription: "Hồ bơi ngoài trời mở cửa từ 6h sáng đến 9h tối.",
  },
  {
    nameHotelFacility: "Dịch vụ spa",
    desCription: "Thư giãn với các liệu pháp spa chuyên nghiệp và massage.",
  },
  {
    nameHotelFacility: "Phòng gym",
    desCription: "Phòng tập thể dục đầy đủ trang thiết bị, mở cửa 24/7.",
  },
  {
    nameHotelFacility: "Nhà hàng",
    desCription:
      "Thưởng thức ẩm thực đa dạng từ Á đến Âu tại nhà hàng của khách sạn.",
  },
  {
    nameHotelFacility: "Dịch vụ đưa đón sân bay",
    desCription: "Dịch vụ đưa đón sân bay thuận tiện với chi phí hợp lý.",
  },
];
export default function HotelDetails() {
  const params = useParams();
  const { id } = params;
  const [dataHotelDetails, setDataHotelDetails] =
    useState<HotelDetailsType | null>(null);

  useEffect(() => {
    const fetchData = async (hotelId: number) => {
      try {
        const data = await GetHotelDetail(hotelId);
        setDataHotelDetails(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    if (id) {
      fetchData(Number(id));
    }
  }, [id]);

  if (!dataHotelDetails) {
    return <div>Loading...</div>;
  }
  const handleFilter = () => {
    console.log("sssss");
  };

  return (
    <div className="mt-[20px]">
      {" "}
      <div className="w-[80%] mx-auto text-2xl">{dataHotelDetails.name}</div>
      <div className="w-[80%] mx-auto flex flex-row  h-[600px] mt-3">
        <div className=" w-[70%]">
          <img
            className="w-full h-full"
            src={dataHotelDetails.imageList[0]}
            alt=""
          />
        </div>
        <div className=" w-[30%]">
          <Preview id={Number(id)} />
        </div>
      </div>
      <div className="grid w-[80%] mx-auto grid-cols-2 gap-4 md:grid-cols-4 mt-[20px]">
        {hotelFacilityList.map((facility, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col">
              <p className="font-semibold">{facility.nameHotelFacility}</p>
              <p className="text-sm text-gray-600">{facility.desCription}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[80%] h-full mx-auto">
        <HotelRoom id={Number(id)} />
      </div>
    </div>
  );
}
