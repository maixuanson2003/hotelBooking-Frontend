"use client";
import { GetAllCity } from "@/app/APi/ApiCity";
import CityCard from "./CityCard";

import { useEffect, useState } from "react";

export default function ListCity() {
  const [dataCity, setDataCity] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllCity();
      setDataCity(data);
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">City List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataCity.map((city: any) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
