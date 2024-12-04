"use server";
export async function VerifyInformation(
  fullName: string,
  email: string,
  phoneNumber: string
) {
  const queryParams = new URLSearchParams({
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
  });
  const res = await fetch(
    `http://localhost:8080/api/actors/verify_information?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}
export async function GetAllUser() {
  const res = await fetch(`http://localhost:8080/api/actors/all`, {
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
