"use client";
import { useEffect, useState } from "react";
import { GetBookingByUsername } from "@/app/APi/ApiBooking";
import Booking from "./Booking";
interface Booking {
  id: number;
  totalRoom: number;
  username: string;
  totalPrice: number;
  status: string;
  numberPeople: number;
  createAt: string;
}
export default function BookingUser() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      totalRoom: 2,
      username: "johndoe",
      totalPrice: 200,
      status: "Confirmed",
      numberPeople: 4,
      createAt: "2024-12-01",
    },
    {
      id: 2,
      totalRoom: 1,
      username: "janedoe",
      totalPrice: 100,
      status: "Canceled",
      numberPeople: 2,
      createAt: "2024-11-28",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      let username = localStorage.getItem("username");
      if (username) {
        const data = await GetBookingByUsername(username);
        setBookings(data);
      }
    };
    fetchData();
  }, []);
  const handleChangeBooking = (id: number) => {
    alert(`Change booking for ID: ${id}`);
  };

  const handleCancelBooking = (id: number) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (confirmCancel) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      alert(`Booking with ID: ${id} has been canceled.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-28 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Your Booking History
      </h1>
      <Booking
        bookings={bookings}
        onChange={handleChangeBooking}
        onCancel={handleCancelBooking}
      />
    </div>
  );
}
