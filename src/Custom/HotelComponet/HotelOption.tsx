import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { accesToken } from "@/app/APi/ApiAuthen";
export interface RoomOptions {
  RoomOption: {
    typeRoom: string;
    amountRoom: number;
    price: number;
  }[];
  HotelId: number;
}
export default function HotelOptions({ RoomOption, HotelId }: RoomOptions) {
  const router = useRouter();
  const [price, setPrice] = useState<number>();
  useEffect(() => {
    let price = 0;
    RoomOption.forEach((element) => {
      price += element.price;
    });
    setPrice(price);
  }, [RoomOption]);
  const handleNavigate = async () => {
    const pathname = `/USER/Booking`;
    const token = await accesToken();

    if (token != null) {
      const encodedRoomOptions = encodeURIComponent(JSON.stringify(RoomOption));

      const url = `${pathname}?roomOptions=${encodedRoomOptions}&&HotelId=${HotelId}`;

      router.push(url);
    } else {
      router.push("/AuthFO/signIn");
    }
  };
  return (
    <div className="w-full  flex flex-col space-y-4">
      <div className="w-full h-[60px]  bg-orange-500 flex items-center justify-center">
        <h2 className="text-white text-lg font-bold">Danh sách phòng Chọn</h2>
      </div>
      <div className="border p-4 mx-auto w-[80%] rounded shadow-lg space-y-2">
        Price:{price} VNĐ
      </div>
      {RoomOption && RoomOption.length > 0 ? (
        RoomOption.map((item, index) => (
          <div
            key={index}
            className="border p-4 mx-auto w-[80%] rounded shadow-lg space-y-2"
          >
            <div className="flex justify-between">
              <label className="font-semibold">Loại phòng:</label>
              <p>{item.typeRoom}</p>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Số lượng đặt:</label>
              <p>{item.amountRoom}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-[80%] mx-auto text-center border border-black p-4 rounded">
          <p>Xin mời đặt phòng</p>
        </div>
      )}
      <Button onClick={handleNavigate}>Tôi sẽ đặt</Button>
    </div>
  );
}
