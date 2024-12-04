"use server";
export default async function CreatPayment(BookingId: number, Price: number) {
  const data = {
    price: Price,
    bookingId: BookingId,
  };
  const res = await fetch(`http://localhost:8080/pay/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.text();
}
