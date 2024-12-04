"use client";
import allContents from "@/Custom/Data";
import { useParams } from "next/navigation";
import { GetAllCity } from "@/app/APi/ApiCity";
import { GetAllEventByCityId } from "@/app/APi/ApiEvent";
import { GetHotelByCityId } from "@/app/APi/ApiHotel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ContainerHotel from "@/Custom/HotelComponet/HotelCarosel";
import ContainerEvent from "@/Custom/Festival/CaroselFestival";
interface Event {
  id: number;
  nameEvent: string;
  description: string;
  image: string;
  dateStart: string;
  dateEnd: string;
}
export default function citiesDetail() {
  const param = useParams();
  const { id } = param;
  const [data, setData] = useState<any>();
  const [dataEvent, setDataEvent] = useState<Event[]>([]);
  const [dataHotel, setDataHotel] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllCity();
      for (let index = 0; index < data.length; index++) {
        if (data[index].id == id) {
          setData(data[index]);
          break;
        }
      }
    };
    const fetchData2 = async (id: number) => {
      const data = await GetAllEventByCityId(id);
      setDataEvent(data);
    };
    const fetchData3 = async (id: number) => {
      const data = await GetHotelByCityId(id);
      setDataHotel(data);
    };
    fetchData3(Number(id));
    fetchData2(Number(id));
    fetchData();
  }, []);
  if (!data) {
    return <div>Loading...</div>; // Hoặc bạn có thể hiển thị thông báo không tìm thấy
  }
  return (
    <div className="w-[80%] mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <img
        src={data.image}
        alt={data.nameCity}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{data.nameCity}</h1>
      <p className="text-gray-600 text-lg mb-6">{data.description}</p>

      <div className="text-gray-700 text-base">
        <h2 className="text-2xl font-semibold mb-4">Giới Thiệu</h2>
        <p>{allContents[Number(id) - 1]}</p>
      </div>
      <h2 className="text-2xl mt-2 font-semibold mb-4">Các lễ hội phong phú</h2>
      <div className="w-full ">
        <ContainerEvent events={dataEvent} />

        <Button className="mt-[30px] bg-orange-400">
          Xem thêm các sự kiện lễ hội khác
        </Button>
      </div>
      <h2 className="text-2xl mt-2 font-semibold mb-4">
        Khách sạn tại thành phố
      </h2>
      <div className="w-full ">
        <ContainerHotel Hotel={dataHotel} />

        <Button className="mt-[30px] bg-orange-400">
          Xem thêm các khách sạn khác
        </Button>
      </div>
    </div>
  );
}
