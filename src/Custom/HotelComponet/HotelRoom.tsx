"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetAllHotelRoomByHotel } from "@/app/APi/ApiHotelRoom";
import { SearchHotelRoom } from "@/app/APi/ApiHotelRoom";
import RoomFilter from "./RoomFilter";
import HotelOptions from "./HotelOption";
import { boolean } from "zod";

interface prop {
  id: number;
}
export interface Filter {
  features: string[];
  priceStart?: number;
  priceEnd?: number;
}
interface RoomOption {
  typeRoom: string;
  amountRoom: number;
  price: number;
}

export default function HotelRoom({ id }: prop) {
  const [rooms, setRooms] = useState<any>([]);
  const [optionRoom, setOptionRoom] = useState<RoomOption[]>([]);
  const [amountRoom, setAmountRoom] = useState<number[]>([]);
  const [reset, setReset] = useState<any>(0);
  const [dataFilter, setDataFilter] = useState<Filter>({
    features: [],
    priceStart: 0,
    priceEnd: 0,
  });
  useEffect(() => {
    const fetchData = async (id: number) => {
      const data = await GetAllHotelRoomByHotel(id);
      setRooms(data);
    };
    fetchData(id);
  }, []);
  useEffect(() => {
    const fetchData = async (id: number) => {
      const data = await GetAllHotelRoomByHotel(id);
      setRooms(data);
    };
    fetchData(id);
  }, [reset]);

  const handleFilter = async (filters: Filter) => {
    const data = await SearchHotelRoom(filters, id);
    setRooms(data);
  };
  const IncreaseValue = (index: number) => {
    setAmountRoom((prevAmountRoom) => {
      const updatedAmountRoom = [...(prevAmountRoom || [])];
      updatedAmountRoom[index] = (updatedAmountRoom[index] || 0) + 1;
      return updatedAmountRoom;
    });
  };
  const DecreaseValue = (index: number) => {
    if (amountRoom[index] > 0) {
      setAmountRoom((prevAmountRoom) => {
        const updatedAmountRoom = [...(prevAmountRoom || [])];
        updatedAmountRoom[index] = (updatedAmountRoom[index] || 0) - 1;
        return updatedAmountRoom;
      });
    }
  };
  const FindRoomWithIndex = (
    typeRoom: string
  ): { room: RoomOption | undefined; index: number } => {
    const index = optionRoom.findIndex((room) => room.typeRoom === typeRoom);
    return {
      room: index !== -1 ? optionRoom[index] : undefined,
      index,
    };
  };
  const handleChooseRoom = (item: any, indexs: number, price: number) => {
    if (amountRoom[indexs] == null || amountRoom[indexs] == 0) {
      alert("mời nhập số lượng phòng");
    } else {
      const RoomOptions = {
        typeRoom: item.typeRoom,
        amountRoom: amountRoom[indexs],
        price: amountRoom[indexs] * price,
      };

      const { room, index } = FindRoomWithIndex(item.typeRoom);

      if (room) {
        const updatedRoom = { ...room, ...RoomOptions };
        setOptionRoom((prev) =>
          prev.map((r, i) => (i === index ? updatedRoom : r))
        );
      } else {
        setOptionRoom((prev) => [...prev, RoomOptions]);
      }
    }
  };
  return (
    <div className=" mx-auto py-8 h-full">
      <RoomFilter onFilter={handleFilter} />

      <div className="overflow-x-auto flex flex-row gap-x-2 h-full">
        <div className="w-[80%]">
          <table className="w-full text-left border-collapse border border-gray-800">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4 border-b-2 border-r-[1.5px]  border-gray-400">
                  Loại chỗ nghỉ
                </th>
                <th className="p-4 border-b-2 border-r-[1.5px] border-gray-400">
                  Số lượng khách
                </th>
                <th className="p-4 border-b-2 border-r-[1.5px]  border-gray-400">
                  Giá cho 1 đêm
                </th>
                <th className="p-4 border-b-2 border-r-[1.5px]  border-gray-400">
                  amount
                </th>
                <th className="p-4 border-b-2 border-r-[1.5px]  border-gray-400">
                  trạng thái
                </th>
                <th className="p-4 border-b-2 border-r-[1.5px]  border-gray-400">
                  Đặt phòng
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room: any, index: number) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-4 w-[20%] border-r-[1.5px]  border-gray-400 border-collapse ">
                    <div className="mb-2 font-semibold text-center">
                      phòng: {room.typeRoom}
                    </div>
                    <img src={room.image} alt="" />
                  </td>
                  <td className="p-4 text-center border-r-[1.5px]  border-gray-400 border-solid">
                    <span className="text-gray-700">
                      {room.numberPeople} người
                    </span>
                  </td>
                  <td className="p-4 text-center border-r-[1.5px]  border-gray-400 border-solid ">
                    <div className="font-bold text-center text-blue-600">
                      ${room.pricePerNight}
                    </div>
                    <p className="text-sm text-center text-gray-500">
                      Đã bao gồm thuế và phí
                    </p>
                  </td>
                  <td className="p-4 border-r-[1.5px]  border-gray-400 border-solid ">
                    <p className="font-semibold text-center text-green-600 mb-1">
                      {room.amount}
                    </p>
                  </td>
                  <td className="p-4 border-r-[1.5px]  border-gray-400 border-solid ">
                    <p className="font-semibold text-center text-green-600 mb-1">
                      {room.status}
                    </p>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex  gap-x-2 mx-auto justify-center items-center">
                      <Button
                        className="rounded-full"
                        onClick={() => {
                          DecreaseValue(index);
                        }}
                      >
                        -
                      </Button>
                      <div className=" w-[20%]">
                        {amountRoom[index] == null ? 0 : amountRoom[index]}
                      </div>
                      <Button
                        className="rounded-full"
                        onClick={() => IncreaseValue(index)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      onClick={() => {
                        handleChooseRoom(room, index, room.pricePerNight);
                      }}
                      className="mt-2  "
                    >
                      Chọn phòng
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rooms.length == 0 && (
            <div className="w-[50%] mx-auto flex flex-col gap-y-3">
              <p className="text-center mt-4">
                Không có phòng nào được tìm thấy
              </p>
              <Button
                onClick={() => setReset(Date.now())}
                className="bg-orange-500 w-[50%] mx-auto"
              >
                Đặt lại Bộ Lọc
              </Button>
            </div>
          )}
        </div>
        <div className="w-[20%] h-[650px] border border-gray-600">
          <HotelOptions RoomOption={optionRoom} HotelId={id} />
        </div>
      </div>
    </div>
  );
}
