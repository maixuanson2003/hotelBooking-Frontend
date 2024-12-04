"use client";
import { useEffect, useState } from "react";
import {
  GetBookingDetailsByBookingId,
  GetBookingById,
} from "@/app/APi/ApiBooking";
import CreatPayment from "@/app/APi/ApiPayment";

interface HotelRoom {
  typeRoom: string;
  status: string;
  numberPeople: number;
  pricePerNight: number;
  image: string;
  amount: number;
}
interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  price: number;
  amountRoom: number;
  createAt: string;
  saleCode: string;
  hotelRoom: HotelRoom;
}
interface Book {
  id: 0;
  totalRoom: number;
  username: string;
  totalPrice: number;
  status: string;
  numberPeople: number;
  createAt: string;
}
interface userContact {
  name: string;
  email: string;
  phone: string;
}
export default function VerifyPayment() {
  const [userContact, setUserContact] = useState<userContact>({
    name: "",
    email: "",
    phone: "",
  });
  const [BookingDetails, setBookingDetails] = useState<Booking[]>([]);
  const [HotelBook, setHotelBook] = useState<HotelRoom[]>([]);
  const [Book, setBook] = useState<Book>({
    id: 0,
    totalRoom: 0,
    username: "string",
    totalPrice: 0,
    status: "string",
    numberPeople: 0,
    createAt: "string",
  });
  useEffect(() => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    let name = urlParams.get("name");
    let email = urlParams.get("email");
    let phone = urlParams.get("phone");
    if (name && email && phone) {
      setUserContact({ name, email, phone });
    }
  }, []);
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US");
  };
  const handlePayment = async (price: number) => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    let BookingId = urlParams.get("BookingId");
    const data = await CreatPayment(Number(BookingId), price);
    window.location.href = `${data}`;
  };
  useEffect(() => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const fetchData = async (id: number, username: string) => {
      const data = await GetBookingById(id, username);
      setBook(data);
    };
    let BookingId = urlParams.get("BookingId");
    let username = localStorage.getItem("username");

    if (BookingId && username) fetchData(Number(BookingId), username);
  }, []);
  useEffect(() => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const BookingId = urlParams.get("BookingId");
    const fetchData = async (BookingIds: number) => {
      let hotelRoom: HotelRoom[] = [];
      const data = await GetBookingDetailsByBookingId(BookingIds);
      data?.forEach((element: Booking) => {
        console.log(element.hotelRoom);

        hotelRoom.push(element.hotelRoom);
      });
      console.log(hotelRoom);

      setHotelBook(hotelRoom);
      setBookingDetails(data);
    };
    if (BookingId) {
      fetchData(Number(BookingId));
    }
  }, []);
  return (
    <div className="w-full mt-28 ">
      <h1 className="self-stretch text-center text-black text-5xl font-normal font-['Roboto']">
        {" "}
        Chi tiết Booking
      </h1>
      <div className="w-[80%] mx-auto flex flex-row gap-x-2">
        <div className="w-[80%] flex flex-col justify-center gap-y-3">
          <div className="px-3 w-full border rounded-md border-gray-400 shadow-md">
            <h1 className="text-[#172432] text-[40px] font-bold font-['Roboto']">
              Thông tin liên lạc
            </h1>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                Họ và tên Khách:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {userContact.name}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                Email Khách:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {userContact.email}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                Số điện thoại Khách:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {userContact.phone}
              </p>
            </div>
          </div>
          <div className="w-full px-3  border rounded-md border-gray-400 shadow-md">
            <h1 className="text-[#172432] text-[40px] font-bold font-['Roboto']">
              Chi tiết Booking
            </h1>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                CheckInDate:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {BookingDetails[0]?.checkInDate}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                CheckOutDate:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {BookingDetails[0]?.checkOutDate}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                Số Lượng người:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {Book?.numberPeople}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                Tổng số phòng đặt:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {Book?.totalRoom}
              </p>
            </div>
            <h1 className="text-[#172432] text-[40px] font-bold font-['Roboto']">
              Phòng đã đặt
            </h1>
            {HotelBook?.map((item: HotelRoom, index: number) => (
              <div className="w-[50%] h-[100px] gap-x-2 border rounded-md border-gray-400 flex flex-row justify-start mt-2 p-2 items-center">
                <div className="w-50% h-full">
                  <img src={item.image} className="w-full h-full" alt="" />
                </div>
                <div className="w-50% h-full">
                  <div className="flex  flex-row justify-start items-center">
                    <label
                      className="text-slate-500 font-normal font-['Inter']"
                      htmlFor=""
                    >
                      TypeRoom:
                    </label>
                    <p className="text-slate-500 font-normal font-['Inter']">
                      {item.typeRoom}
                    </p>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <label
                      className="text-slate-500 font-normal font-['Inter']"
                      htmlFor=""
                    >
                      Price:
                    </label>
                    <p className="text-slate-500 font-normal font-['Inter']">
                      {item.pricePerNight}
                    </p>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <label
                      className="text-slate-500 font-normal font-['Inter']"
                      htmlFor=""
                    >
                      NumberPeople:
                    </label>
                    <p className="text-slate-500 font-normal font-['Inter']">
                      {item.numberPeople}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[20%] ">
          <div className="w-[90%] border rounded-md border-gray-400 ">
            <div className=" p-3 bg-gray-100 rounded-md">
              <h2 className="text-lg font-bold">Chính sách khách sạn:</h2>
              <ul className="list-disc pl-5">
                <li>Thời gian nhận phòng: 14:00</li>
                <li>Thời gian trả phòng: 12:00</li>
                <li>Không hoàn tiền khi hủy sau 24h</li>
                <li>Không hút thuốc trong phòng</li>
              </ul>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-3 mt-5">
              <label
                className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos"
                htmlFor=""
              >
                Tổng Tiền:
              </label>
              <p className="text-slate-500 text-2xl font-normal font-['Inter'] leading-loos">
                {formatCurrency(Book.totalPrice)}
              </p>
            </div>
            <button
              onClick={() => handlePayment(Book.totalPrice)}
              className="mt-5 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-bold"
            >
              Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
