"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HotelView, EventView } from "./ComponetsPage";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaDoorOpen,
  FaSearch,
} from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Modal from "@/Custom/Modal";
import CustomCarosel from "@/Custom/Carosel/CustomCarosel";
import { FaHotel, FaCity, FaHeadset, FaDollarSign } from "react-icons/fa";

import { GetAllCity } from "./APi/ApiCity";
const EventData = [
  {
    nameEvent: "Lễ Hội Âm Nhạc",
    description: "Một lễ hội âm nhạc lớn với nhiều nghệ sĩ nổi tiếng.",
    image:
      "https://statics.didau.com/image/2022/12/02/cba355750fc845dd90587f5ad1891c90.jpg",
    dateStart: "2024-10-29",
    dateEnd: "2024-05-03",
  },
  {
    nameEvent: "Triển Lãm Nghệ Thuật",
    description:
      "Triển lãm nghệ thuật đương đại với các tác phẩm từ nhiều nghệ sĩ.",
    image:
      "https://vannghedanang.org.vn/app/upload/post/2023-09-21/thoi-su-van-nghe-11019.jpg",
    dateStart: "2024-06-10",
    dateEnd: "2024-06-20",
  },
  {
    nameEvent: "Chạy Marathon",
    description:
      "Sự kiện chạy marathon thường niên, thu hút hàng ngàn người tham gia.",
    image:
      "https://vannghedanang.org.vn/app/upload/post/2023-09-21/thoi-su-van-nghe-11019.jpg",
    dateStart: "2024-07-15",
    dateEnd: "2024-07-15",
  },
];
const hotelData = [
  {
    image:
      "https://tse4.mm.bing.net/th?id=OIP.XTwtEvN1_LtzY_O8JfFJCgHaE8&pid=Api&P=0&h=220",
    address: "123 Main St",
    city: "New York",
    starPoint: 5,
  },
  {
    image:
      "https://tse4.mm.bing.net/th?id=OIP.XTwtEvN1_LtzY_O8JfFJCgHaE8&pid=Api&P=0&h=220",
    address: "456 Broadway",
    city: "Los Angeles",
    starPoint: 4,
  },
  {
    image:
      "https://tse4.mm.bing.net/th?id=OIP.XTwtEvN1_LtzY_O8JfFJCgHaE8&pid=Api&P=0&h=220",
    address: "789 Ocean Dr",
    city: "Miami",
    starPoint: 3,
  },
  {
    image:
      "https://tse4.mm.bing.net/th?id=OIP.XTwtEvN1_LtzY_O8JfFJCgHaE8&pid=Api&P=0&h=220",
    address: "789 Ocean Dr",
    city: "Miami",
    starPoint: 3,
  },
];

export default function Home() {
  const router = useRouter();
  const [dataCity, SetDataCity] = useState<any[]>([]);
  const [NameCity, SetNameCity] = useState<string>("");
  const [dataCityRender, SetDataCityRender] = useState<any[]>([]);
  const [CheckinDate, setCheckinDate] = useState<Date>();
  const [CheckOutDate, setCheckOutDate] = useState<Date>();
  const [isShows, setIsShow] = useState<any>(false);
  const [numberPeople, SetNumberPeople] = useState<number>(0);
  const [numberRoom, SetnumberRoom] = useState<number>(0);
  const handleClose = () => {
    console.log(isShows);
    setIsShow(false);
  };
  function handleDataCity(data: any[]): any[] {
    let datas: any[] = [];
    for (let i = 0; i < 8; i++) {
      let ElementArray = (
        <div
          key={i}
          className="p-3  bg-white shadow-md rounded-lg hover:shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <div className="relative h-[80%] overflow-hidden rounded-t-lg">
            <img
              className="w-full h-full "
              src={data[i].image}
              alt={data[i].nameCity}
            />
          </div>
          <p className="mt-2 text-lg font-semibold text-center text-gray-800">
            {data[i].nameCity}
          </p>
        </div>
      );
      datas.push(ElementArray);
    }
    return datas;
  }
  const handleNavigate = () => {
    const pathname = "/USER/hotels";
    const query = {
      numberPeople: numberPeople.toString(),
      numberRoom: numberRoom.toString(),
      CheckinDate: CheckinDate ? CheckinDate.toISOString() : "",
      CheckOutDate: CheckOutDate ? CheckOutDate.toISOString() : "",
      NameCity: NameCity,
    };

    const url = `${pathname}?${new URLSearchParams(query).toString()}`;

    router.push(url);
  };
  const handleApi = async () => {
    const data = await GetAllCity();
    console.log(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllCity();
      SetDataCity(data);
      SetDataCityRender(handleDataCity(data));
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="w-full h-16"></div>
      <div className=" relative h-[700px] w-full">
        <div className="w-full h-[700px] absolute">
          <img
            className="w-full h-full"
            src="https://images.pexels.com/photos/7502483/pexels-photo-7502483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="text-white absolute bg-black w-full h-[700px]  inset-0 opacity-35"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl h-[50%] mt-[50px] ">
          <h1 className="mb-2">TÌM KIẾM KHÁCH SẠN BẠN MUỐN</h1>
          <h1>Khám phá những địa điểm tuyệt vời với ưu đãi độc quyền</h1>
          <div className="w-[80%] mt-[20px] flex flex-row justify-center items-center gap-x-3">
            <div className="w-[25%] flex justify-center items-center">
              <div className="flex items-center w-full">
                <FaCity className="text-orange-500 mr-2" />
                <select
                  onChange={(e) => SetNameCity(e.target.value)}
                  name="city"
                  id="city"
                  className="p-2 rounded bg-white text-xl text-black w-full h-[60px] "
                >
                  {dataCity?.map((city) => (
                    <option value={city.nameCity}>{city.nameCity}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-[25%] flex items-center">
              <FaCalendarAlt className="text-orange-500 mr-2" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "p-2 rounded bg-white text-black w-full h-[60px]",
                      !CheckinDate && "text-muted-foreground"
                    )}
                  >
                    {CheckinDate ? (
                      format(CheckinDate, "PPP")
                    ) : (
                      <span>Check in Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className="w-full"
                    mode="single"
                    selected={CheckinDate}
                    onSelect={setCheckinDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-[25%] flex items-center">
              <FaCalendarAlt className="text-orange-500 mr-2" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "p-2 rounded bg-white text-black w-full h-[60px]",
                      !CheckOutDate && "text-muted-foreground"
                    )}
                  >
                    {CheckOutDate ? (
                      format(CheckOutDate, "PPP")
                    ) : (
                      <span>Check out Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className="w-full"
                    mode="single"
                    selected={CheckOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div
              className={`w-[25%] bg-white text-black text-xl h-[60px] rounded-sm flex justify-center items-center ${
                isShows ? "relative" : ""
              }`}
            >
              <FaUserFriends className="text-orange-500 mr-2" />
              <div
                className="w-full text-center hover:cursor-pointer"
                onClick={() => setIsShow(true)}
              >
                Số người/lượng phòng
              </div>
              <Modal
                isShow={isShows}
                className="absolute mt-56 bg-white z-50 transition duration-500 ease-out rounded-md"
              >
                <div className="flex flex-row justify-around items-center gap-x-3 mt-2 border-b-[1.5px] border-b-slate-300">
                  <label htmlFor="" className="flex items-center">
                    <FaUserFriends className="text-orange-500 mr-2" />
                    Người
                  </label>
                  <div className="flex flex-row justify-start items-center gap-x-6">
                    <Button
                      className="w-full bg-orange-600 text-black hover:bg-orange-500"
                      onClick={() => {
                        if (numberPeople > 0) SetNumberPeople(numberPeople - 1);
                      }}
                    >
                      -
                    </Button>
                    <div>{numberPeople}</div>
                    <Button
                      className="w-full bg-orange-600 text-black hover:bg-orange-500"
                      onClick={() => SetNumberPeople(numberPeople + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row justify-around items-center gap-x-3 mt-2 border-b-[1.5px] border-b-slate-300">
                  <label htmlFor="" className="flex items-center">
                    <FaDoorOpen className="text-orange-500 mr-2" />
                    Phòng
                  </label>
                  <div className="flex flex-row justify-start items-center gap-x-6">
                    <Button
                      className="w-full bg-orange-600 text-black hover:bg-orange-500"
                      onClick={() => {
                        if (numberRoom > 0) SetnumberRoom(numberRoom - 1);
                      }}
                    >
                      -
                    </Button>
                    <div>{numberRoom}</div>
                    <Button
                      className="w-full bg-orange-600 text-black hover:bg-orange-500"
                      onClick={() => SetnumberRoom(numberRoom + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  className="mt-3 w-full bg-orange-600 text-black hover:bg-orange-500"
                  onClick={handleClose}
                >
                  Accept
                </Button>
              </Modal>
            </div>
          </div>
          <div className="w-[20%] h-[40px] mt-[30px] flex items-center">
            <FaSearch className="text-white mr-2" />
            <Button
              onClick={() => handleNavigate()}
              className="w-full bg-orange-600 text-black hover:bg-orange-500"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-[200px]  flex  justify-center ">
        <div className="w-[70%] h-full bg-gradient-to-b from-orange-400 to-orange-600 mt-[-40px] flex flex-row justify-center items-center gap-x-3  z-40">
          <div className="w-[25%] h-full flex flex-col justify-center items-center">
            <FaCity className="text-3xl text-white" />
            <h1 className="text-xl text-center text-white">63+ thành phố</h1>
            <h1 className="text-xl text-center text-white">
              Nhiều địa điểm du lịch tuyệt vời
            </h1>
          </div>
          <div className="w-[25%] h-full flex flex-col justify-center items-center ">
            <FaHeadset className="text-3xl text-white" />
            <h1 className="text-xl text-center text-white">Thân thiện</h1>
            <h1 className="text-xl text-center text-white">
              Tư vấn tận tình ,Giúp khách hàng có thể tìm được điểm đến lý tưởng
            </h1>
          </div>
          <div className="w-[25%] h-full  flex flex-col justify-center items-center">
            <FaDollarSign className="text-3xl text-white" />
            <h1 className="text-xl text-center text-white">
              Đảm bảo giá tốt nhất
            </h1>
            <h1 className="text-xl text-center text-white">
              Giá phù hợp trong vòng 48 giờ sau khi xác nhận đơn hàng
            </h1>
          </div>
          <div className="w-[25%]  h-full flex flex-col justify-center items-center ">
            <FaHotel className="text-3xl text-white" />
            <h1 className="text-xl text-center text-white">63+ thành phố</h1>
            <h1 className="text-xl text-center text-white">
              Cùng với nhiều khu du lịch nghỉ dưỡng
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px] flex flex-col items-center mt-7 bg-gray-100">
        <div className="w-[70%] h-[15%] border-b-[1.5px] border-b-orange-400 flex flex-col justify-center text-3xl font-mono">
          <div className="flex flex-col justify-center">
            <p className="text-center">Các địa điểm lý tưởng</p>
            <Link
              className="text-center text-xl hover: cursor-pointer hover:text-orange-500"
              href={"/USER/cities"}
            >
              Khám phá thêm
            </Link>
          </div>
        </div>
        <div className="w-[70%] h-[90%] mt-2">
          <CustomCarosel ElementArray={dataCityRender} />
        </div>
      </div>
      <div className="w-full  flex flex-col items-center  bg-gray-100">
        <div className="w-[70%] h-[15%] border-b-[1.5px] border-b-orange-400 flex flex-col justify-center text-3xl font-mono">
          <div className="flex flex-col justify-center">
            <p className="text-center">Khách sạn được đánh giá cao</p>
            <Link
              className="text-center text-xl hover: cursor-pointer hover:text-orange-500"
              href={"/USER/cities"}
            >
              Khám phá thêm
            </Link>
          </div>
        </div>
        <div className="w-[70%] h-[90%] mt-2 gap-x-4 flex flex-row justify-between items-center mt-8">
          <HotelView ElementArray={hotelData} />
        </div>
      </div>
      <div className="w-full h-[700px] flex justify-center items-center  bg-gray-100">
        <div className="w-[70%] h-full flex flex-row justify-between items-center space-x-6">
          <div className="w-[50%] h-[70%] bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex justify-center items-center shadow-lg">
            <div className="w-[80%] h-[90%] flex flex-col justify-center items-center text-center">
              <h1 className="text-white text-4xl font-bold mb-4 leading-snug">
                Tận hưởng kì nghỉ với nhiều ưu đãi
              </h1>
              <h1 className="text-white text-2xl font-medium mb-6">
                Ưu đãi khủng đang chờ bạn
              </h1>
              <Button
                onClick={() => router.push("/USER/Deal")}
                className="w-[60%] py-2 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
          <div className="w-[50%] h-[70%] rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              src="https://luanvanviet.com/wp-content/uploads/2020/11/hinh-anh-cac-loai-hinh-du-lich-3.jpg"
              alt="Hình ảnh du lịch"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[700px] flex flex-col justify-center items-center mt-[50px]">
        <div className="w-[70%] h-[15%] border-b-[1.5px] border-b-orange-400 flex flex-col justify-center text-3xl font-mono">
          <div className="flex flex-col justify-center">
            <p className="text-center">Sự kiện/lễ hội</p>
            <Link
              className="text-center text-xl hover: cursor-pointer hover:text-orange-500"
              href={"/USER/cities"}
            >
              Khám phá thêm
            </Link>
          </div>
        </div>
        <div className="w-[70%] h-[60%] flex flex-row justify-center items-center gap-x-3 mt-4">
          {EventData.map((item, index) => (
            <EventView
              key={index}
              ElementEvent={item}
              className="w-25% h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
