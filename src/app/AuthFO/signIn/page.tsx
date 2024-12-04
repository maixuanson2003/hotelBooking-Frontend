"use client";
import { useState } from "react";
import { signIns } from "@/app/APi/ApiAuthen";
import { useRouter } from "next/navigation";

export default function signIn() {
  const [state, setState] = useState<any>("notHotel");
  const router = useRouter();
  const [Username, setUserName] = useState<any>();
  const [Password, setPassword] = useState<any>();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username: Username,
      password: Password,
    };

    try {
      const datas = await signIns(data);
      if (datas.statusCode == 200) {
        // localStorage.setItem("token", datas.data.token);
        localStorage.setItem("username", datas.data.username);
        localStorage.setItem("type", datas.data.type);
        localStorage.setItem("hotelid", datas.data.hotelId);

        window.location.href = "/";
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div
      className="w-full h-[900px] bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://hanoispiritofplace.com/wp-content/uploads/2018/03/hinh-anh-bien-dep-29.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[45%] p-8 bg-white bg-opacity-80 rounded-lg shadow-md"
      >
        <h1 className="text-center font-medium ">Đăng nhập</h1>
        <div className="w-full h-[40px] flex flex-row justify-center ">
          <div
            className={`text-center flex items-center justify-center h-full ${
              state == "hotel" ? "bg-orange-400" : ""
            } hover:cursor-pointer w-1/2`}
            onClick={() => setState("hotel")}
          >
            Cho khách sạn
          </div>
          <div
            className={`text-center flex items-center justify-center h-full ${
              state == "notHotel" ? "bg-orange-400" : ""
            } hover:cursor-pointer w-1/2`}
            onClick={() => setState("notHotel")}
          >
            cho khách hàng/admin
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            {state == "hotel" ? "AccountHotel" : "Username"}
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            // value={formData.fullName}
            // onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="text"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            // value={formData.username}
            // onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
