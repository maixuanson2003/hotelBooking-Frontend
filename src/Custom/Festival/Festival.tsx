"use client";
import { useEffect, useState } from "react";
import { GetAllEvent } from "@/app/APi/ApiEvent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function getTimeRemaining(eventDate: any) {
  console.log(eventDate);

  const now = new Date().getTime();
  const countDownDate = new Date(eventDate + "T00:00:00Z").getTime();
  const distance = countDownDate - now;

  if (distance <= 0) return "Event started!";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
export default function Festival() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAllEvent();
      setData(response);

      const initialCountdowns = response.map((event: any) => {
        if (!event.dateStart) {
          return "Date not available!";
        }
        return getTimeRemaining(event.dateStart);
      });
      setCountdowns(initialCountdowns);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns: any) =>
        prevCountdowns.map((countdown: any, index: number) =>
          data[index]?.dateStart
            ? getTimeRemaining(data[index].dateStart)
            : countdown
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="w-[90%] mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Lễ hội sắp diễn ra
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">Không có lễ hội nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((event: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl  flex flex-col items-center"
            >
              <img
                src={event.image || "https://via.placeholder.com/150x150"}
                alt={event.nameEvent}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                {event.nameEvent}
              </h2>
              <p className="text-gray-600 text-sm text-center mb-4">
                {event.description}
              </p>

              <div className="flex flex-row justify-center items-center gap-x-4">
                <div className="bg-orange-500 text-white text-lg font-bold py-2 px-6 rounded-lg mt-4">
                  <span>{countdowns[index]}</span>
                </div>
                <Button
                  onClick={() => router.push("/USER/hotels")}
                  className="w-[40%] bg-blue-600 text-white mt-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Nhanh tay đặt phòng
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
