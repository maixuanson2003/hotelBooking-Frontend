"use client";
import UserProfile from "@/Custom/userProfile/UserProfile";
import { useEffect, useState } from "react";
import { GetAllUser } from "@/app/APi/ApiUser";
export default function Profile() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllUser();
      let username = localStorage.getItem("username");
      for (let index = 0; index < data.length; index++) {
        if (data[index].username == username) {
          setData(data[index]);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <div className="w-full h-16"></div>
      <UserProfile
        address={data?.address}
        email={data?.email}
        birthday={data?.birthday}
        fullName={data?.fullName}
        gender={data?.gender}
        phone={data?.phone}
        username={data?.username}
        id={data?.id}
      />
    </div>
  );
}
