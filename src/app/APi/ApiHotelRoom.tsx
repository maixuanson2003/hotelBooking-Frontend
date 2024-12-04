import { Filter } from "@/Custom/HotelComponet/HotelRoom";
export async function GetAllHotelRoomByHotel(id: number) {
  const res = await fetch(
    `http://localhost:8080/api/v1/hotels/rooms/all/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function SearchHotelRoom(dataFilter: Filter, id: number) {
  const query = new URLSearchParams();
  if (dataFilter.priceStart !== undefined) {
    query.append("priceStart", dataFilter.priceStart.toString());
  }
  if (dataFilter.priceEnd !== undefined) {
    query.append("priceEnd", dataFilter.priceEnd.toString());
  }
  dataFilter.features.forEach((feature) => {
    query.append("features", feature);
  });
  dataFilter.features.forEach((feature) => {
    query.append("features", feature);
  });

  const res = await fetch(
    `http://localhost:8080/api/v1/hotels/rooms/search/${id}?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
