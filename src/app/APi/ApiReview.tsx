"use server";
export async function GetPreviewByHotel(id: number) {
  const res = await fetch(`http://localhost:8080/api/reviews/${id}`, {
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
export async function PostPreviewByHotel(
  id: number,
  description: string,
  username: string,
  starpoint: number
) {
  const queryParams = new URLSearchParams({
    description: String(description),
    username: String(username),
    starPoint: String(starpoint),
  });
  const res = await fetch(
    `http://localhost:8080/api/reviews/${id}?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.text();
}
