"use server";
export async function GetAllPolicy() {
  const res = await fetch(
    "http://localhost:8080/api/hotelPolicyDetails/hotelPolicy/All",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Đảm bảo không cache khi fetch từ server-side
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
