"use server";
export async function GetAllEvent() {
  const res = await fetch("http://localhost:8080/api/events/all", {
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
export async function GetAllEventByCityId(id: number) {
  const res = await fetch(`http://localhost:8080/api/events/city/${id}/all`, {
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
