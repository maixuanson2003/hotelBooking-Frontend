"use client";
import { useState, useEffect } from "react";
import { GetAllHotelRoomByHotel } from "@/app/APi/ApiHotelRoom";
import FormBooking from "./FormBooking";
import { VerifyInformation } from "@/app/APi/ApiUser";
import { CreateBooking } from "@/app/APi/ApiBooking";
import Toast from "./Toast";
import { useRouter } from "next/navigation";

interface RoomOption {
  typeRoom: string;
  amountRoom: number;
  price: number;
}
interface Room {
  typeRoom: string;
  status: string;
  numberPeople: number;
  pricePerNight: number;
  image: string;
  amount: number;
}
interface TypeRoom {
  amountRoom: number;
  typeRoom: string;
}
interface userDetails {
  name: string;
  email: string;
  phone: string;
  saleCode: string;
  numberPeople: number;
  hotelId: number;
  checkinDate: string;
  checkOutDate: string;
}

export default function BookingStart() {
  const router = useRouter();
  const [dataRoom, setDataRoom] = useState<Room[]>([]);
  const [RoomOption, setRoomOption] = useState<RoomOption[]>([]);
  const [CheckToast, setCheckToast] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    phone: string;
    saleCode: string;
    numberPeople: number;
    hotelId: number;
    checkinDate: string;
    checkOutDate: string;
  }>({
    name: "",
    email: "",
    phone: "",
    saleCode: "",
    numberPeople: 1,
    hotelId: 0,
    checkinDate: "",
    checkOutDate: "",
  });
  const pushToTypeRoom = (RoomOption: RoomOption[]) => {
    let newTypeRooms: TypeRoom[] = [];
    for (const Room of RoomOption) {
      const data = {
        amountRoom: Room.amountRoom,
        typeRoom: Room.typeRoom,
      };
      newTypeRooms.push(data);
    }

    return newTypeRooms;
  };

  useEffect(() => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const roomOptionsParam = urlParams.get("roomOptions");
    const HotelIdParam = urlParams.get("HotelId");
    let HotelId: any = null;
    if (HotelIdParam) {
      HotelId = parseInt(HotelIdParam);
    }
    console.log(HotelId);

    setUserDetails((prevState) => ({ ...prevState, hotelId: HotelId }));
    let roomOptions = null;
    if (roomOptionsParam) {
      roomOptions = JSON.parse(decodeURIComponent(roomOptionsParam));
    }

    setRoomOption(roomOptions);
    const fetchData = async (id: number) => {
      const data = await GetAllHotelRoomByHotel(id);
      setDataRoom(data);
    };
    if (HotelId) fetchData(HotelId);
  }, []);

  const FindRoomData = (typeRoom: string): Room | null => {
    for (const element of dataRoom) {
      if (element.typeRoom === typeRoom) {
        return element;
      }
    }
    return null;
  };

  const showAmountRoomBooking = (typeRoom: string): number | null => {
    let AmountRoom = null;
    for (const element of RoomOption) {
      if (element.typeRoom === typeRoom) {
        AmountRoom = element.amountRoom;
      }
    }
    return AmountRoom;
  };

  const TotalPrice = () => {
    let TotalPrice = 0;
    for (const element of RoomOption) {
      TotalPrice += element.price;
    }
    return TotalPrice;
  };

  const DataBooking = (): Room[] => {
    let DataRoomOption: Room[] = [];
    RoomOption.forEach((element) => {
      let data = FindRoomData(element.typeRoom);
      if (data) {
        DataRoomOption.push(data);
      }
    });
    return DataRoomOption;
  };
  const handleNavigation = (userDetail: userDetails, BookingId: number) => {
    const pathname = `/USER/Payment`;
    const url = `${pathname}?name=${userDetail.name}&&email=${userDetail.email}&&phone=${userDetail.phone}&&BookingId=${BookingId}&&HotelId=${userDetails.hotelId}`;
    router.push(url);
  };
  const handleBooking = async (userDetail: userDetails) => {
    const dataBooking = {
      typeRoom: pushToTypeRoom(RoomOption),
      saleCode: userDetail.saleCode,
      numberPeople: userDetail.numberPeople,
      checkOutDate: userDetail.checkOutDate,
      checkinDate: userDetail.checkinDate,
      hotelId: userDetails.hotelId,
    };
    const data = await VerifyInformation(
      userDetail.name,
      userDetail.email,
      userDetail.phone
    );
    if (!data) {
      setCheckToast(true);
      return;
    }
    let Itemget = localStorage.getItem("username");
    let username: string = "";
    if (Itemget) {
      username = Itemget;
    }

    const dataCreate = await CreateBooking(username, dataBooking);
    handleNavigation(userDetail, dataCreate.id);
  };
  const handleToastClose = () => {
    setCheckToast(false);
  };

  return (
    <div className="w-full h-auto mt-28">
      <Toast CheckToast={CheckToast} onClose={handleToastClose} />
      <div className="w-[80%] flex justify-center mx-auto mt-[40px]">
        {/* Room Booking Details */}
        <div className="w-[50%] flex flex-col gap-y-2 border-b-[1.5px] border-gray-600">
          {DataBooking()?.map((item: Room, index: number) => (
            <div
              key={index}
              className="w-full flex gap-x-2 justify-start gap-y-4 rounded-md border border-gray-600 shadow-xl p-4"
            >
              <img src={item.image} className="w-[30%] h-auto" alt="" />
              <div>
                <div className="flex">
                  <label htmlFor="">Loại phòng: </label>
                  <p className="ml-2">{item.typeRoom}</p>
                </div>
                <div className="flex">
                  <label htmlFor="">Số lượng đặt: </label>
                  <p className="ml-2">{showAmountRoomBooking(item.typeRoom)}</p>
                </div>
                <div className="flex">
                  <label htmlFor="">Giá mỗi đêm: </label>
                  <p className="ml-2">{item.pricePerNight}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-start items-center gap-x-2">
            <h1 className="text-xl font-semibold">Tổng giá:</h1>
            <p className="text-xl">{TotalPrice()}</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="w-[50%] p-4">
          <h2 className="text-2xl font-semibold mb-4">Thông tin đặt phòng</h2>
          <FormBooking
            handleSenData={handleBooking}
            HotelId={userDetails.hotelId}
          />
        </div>
      </div>
    </div>
  );
}
