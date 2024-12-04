"use server";
import { cookies } from "next/headers";
export async function GetAllHotel() {
  const res = await fetch("http://localhost:8080/api/hotels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function SearchHotel(address: string, bodyRequest: any) {
  const token = localStorage.getItem("token");
  const queryParams = new URLSearchParams({
    address: address,
  });
  const res = await fetch(
    `http://localhost:8080/api/hotels/suit?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },

      cache: "no-store",
      body: JSON.stringify(bodyRequest),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function GetHotelDetail(id: number) {
  const res = await fetch(`http://localhost:8080/api/hotels/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log(data);

  return data;
}
export async function GetHotelByCityId(id: number) {
  const res = await fetch(
    `http://localhost:8080/api/hotels/HotelBycity/${id}`,
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
  console.log(data);

  return data;
}
export async function handleFilterHotel(
  hotelPolicy: string[],
  address: string,
  starPonit: number,
  RoomRequest: any
) {
  const queryParams = new URLSearchParams();
  hotelPolicy.forEach((policy: string) =>
    queryParams.append("hotelPolicyList", policy)
  );
  queryParams.append("address", address);
  queryParams.append("starpoint", String(starPonit));

  const res = await fetch(
    `http://localhost:8080/api/hotels/conditional?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(RoomRequest),
    }
  );
  if (!res.ok) {
    console.log(res);

    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log(data);

  return data;
}
