"use client";
import { useRouter, useParams } from "next/navigation";
import FilterBar from "@/Custom/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import { GetAllHotel } from "@/app/APi/ApiHotel";
import { HotelComponet } from "@/Custom/HotelComponet/Hotels";
import Pagination from "@/Custom/Pagination";
import { handleFilterHotel } from "@/app/APi/ApiHotel";
import { any } from "zod";
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
export default function hotel() {
  const [hotelList, setHotelList] = useState<any[]>([]);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [starRating, setStarRating] = useState<number>(0); // Star Rating
  const [dataCity, setDataCity] = useState<any[]>([]); // Danh sách city
  const [RoomRequest, setRoomRequest] = useState<RoomRequest>({
    numberPeople: 0,
    checkOutDate: "",
    amountRoom: 0,
    checkinDate: "",
  });
  const [address, setAddress] = useState("");
  const [hotelPolicyList, setHotelPolicyList] = useState<any[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllHotel();
      setHotelList(handlePagination(data, page, 8));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllHotel();
      setHotelList(handlePagination(data, page, 8));
    };
    fetchData();
  }, [page]);

  const handleDataRoomRequest = async (data: RoomSearch) => {
    const filteredData = await handleFilterHotel(
      data.hotelPolicy,
      data.address,
      data.starpoint,
      data.RoomRequest
    );
    setHotelList(filteredData);
  };
  const handlePagination = (Data: any[], page: number, Limit: number) => {
    const numberPages = Math.ceil(Data.length / Limit);
    let dataPagination: any[] = [];
    setNumberPage(numberPages);
    for (
      let index = page * Limit - Limit;
      index < page * Limit && index < Data.length;
      index++
    ) {
      dataPagination.push(Data[index]);
    }
    return dataPagination;
  };
  const handleChangePage = (data: number) => {
    setPage(data);
  };
  return (
    <div>
      <div className=" relative h-[600px] w-full">
        <div className="w-full h-[600px] absolute">
          <img
            className="w-full h-full"
            src="https://images.pexels.com/photos/7502483/pexels-photo-7502483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="text-white absolute bg-black w-full h-[600px]  inset-0 opacity-35"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl h-[50%] mt-[50px] ">
          <h1 className="font-sans">TÌM KIẾM KHÁCH SẠN BẠN MUỐN</h1>
          <h1 className="font-semibold">
            Khám phá những địa điểm tuyệt vời với ưu đãi độc quyền
          </h1>
        </div>
      </div>
      <div className="w-full      ">
        <div className="w-[70%] h-full flex justify-center gap-x-2 mx-auto mt-12">
          <div className="w-[20%]  ">
            <FilterBar onFilterChangeRoomRequest={handleDataRoomRequest} />
          </div>
          <div className="w-[80%] ">
            <h1>Kết quả:{hotelList.length}</h1>
            {hotelList ? (
              hotelList.map((item: any, index: number) => (
                <HotelComponet key={index} Hotel={item} />
              ))
            ) : (
              <p>No hotels available.</p>
            )}
          </div>
        </div>
        <Pagination
          currentPage={page}
          totalPages={numberPage}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
}
