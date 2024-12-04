import { Interface } from "readline";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PropsHotel {
  ElementArray: any[];
}
export function HotelView({ ElementArray }: PropsHotel) {
  return ElementArray?.map((item, index) => (
    <div
      key={index}
      className="w-[30%] h-full border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative h-[75%] w-full">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          src={item.image}
          alt={item.city}
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Featured
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Address and City */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-800 truncate">
            {item.address}
          </h1>
          <h2 className="text-sm text-gray-500">{item.city}</h2>
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex">
            {[...Array(5)].map((_, idx) => (
              <span
                key={idx}
                className={`${
                  idx < item.starPoint ? "text-orange-500" : "text-gray-300"
                } text-lg`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400">Rating: {item.starPoint}/5</p>
        </div>

        {/* Button */}
        <div className="mt-4">
          <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors">
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  ));
}
interface PropsEvent {
  className: string;
  ElementEvent: any;
}
export function EventView({ ElementEvent, className }: PropsEvent) {
  const calculateDayLate = (inputDate: string): number => {
    const currentDate = new Date();
    const inputDates = new Date(inputDate);
    let timeDifference: number = inputDates.getTime() - currentDate.getTime();
    let dayDifference: number = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    return dayDifference;
  };
  return (
    <div
      className={`relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <img
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        src={ElementEvent.image}
        alt={ElementEvent.nameEvent}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <p className="text-sm text-gray-200 font-medium">
          Còn {calculateDayLate(ElementEvent.dateStart)} ngày
        </p>
        <h1 className="text-lg text-white font-semibold text-center px-4">
          {ElementEvent.description}
        </h1>
      </div>
      <div className="mt-2 text-center text-base font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
        {ElementEvent.nameEvent}
      </div>
    </div>
  );
}
