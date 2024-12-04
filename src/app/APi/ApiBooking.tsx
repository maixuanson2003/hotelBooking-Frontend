"use server";
export async function CreateBooking(username: string, DataBooking: any) {
  const queryParams = new URLSearchParams({
    username: username,
  });
  const res = await fetch(
    `http://localhost:8080/api/bookings/create?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(DataBooking),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}
export async function GetBookingDetailsByBookingId(BookingId: number) {
  const res = await fetch(
    `http://localhost:8080/api/booking-details/get/${BookingId}`,
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
export async function GetBookingById(BookingId: number, username: string) {
  const queryParams = new URLSearchParams({
    username: username,
  });
  const res = await fetch(
    `http://localhost:8080/api/bookings/${BookingId}?${queryParams}`,
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
export async function GetBookingByUsername(username: string) {
  const res = await fetch(
    `http://localhost:8080/api/bookings/user/${username}`,
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
