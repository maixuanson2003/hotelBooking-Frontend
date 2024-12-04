"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { OTPget, verifyOTP, registers } from "@/app/APi/ApiAuthen";
const signupSchema = z.object({
  fullName: z.string().min(2, "Full Name phải có ít nhất 2 ký tự"),
  username: z.string().min(3, "Username phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Password phải có ít nhất 6 ký tự"),
  phone: z.string().regex(/^\d+$/, "Phone phải là số"),
  email: z.string().email("Email không hợp lệ"),
  birthday: z.string().nonempty("Birthday là bắt buộc"),
  address: z.string().optional(),
  gender: z.enum(["male", "female", "other"]),
});
const otpSchema = z.object({
  otp: z
    .string()
    .length(5, "OTP phải có đúng 5 chữ số")
    .regex(/^\d+$/, "OTP chỉ bao gồm số"),
});
type OtpFormInputs = z.infer<typeof otpSchema>;

type SignupFormData = z.infer<typeof signupSchema>;

export default function signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm<OtpFormInputs>({
    resolver: zodResolver(otpSchema),
  });
  const [state, setState] = useState<any>(1);
  const [formData, setFormData] = useState<any>({
    fullName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    birthday: "",
    address: "",
    gender: "",
  });
  const onOtpSubmit = async (data: OtpFormInputs) => {
    let datas: any = await verifyOTP(data.otp);
    if (datas) {
      let data1 = await registers(formData);
      router.push("/AuthFO/signIn");
    }
  };

  const GetOtp = async (data: SignupFormData) => {
    const dataRegister = {
      fullName: data.fullName,
      username: data.username,
      password: data.password,
      phone: data.phone,
      email: data.email,
      birthday: data.birthday,
      address: data.address,
      gender: data.gender,
    };
    let datas: any = await OTPget(data.email);
    setState(datas);
    setFormData(dataRegister);
  };
  return (
    <div
      className="w-full h-[900px] bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://hanoispiritofplace.com/wp-content/uploads/2018/03/hinh-anh-bien-dep-29.jpg')",
      }}
    >
      {state == 200 && (
        <form
          onSubmit={handleSubmitOtp(onOtpSubmit)}
          className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Xác Thực OTP
          </h2>
          <input
            type="text"
            {...registerOtp("otp")}
            placeholder="Nhập mã OTP"
            className="w-full p-3 border border-gray-300 rounded-lg mt-4"
            maxLength={5}
          />
          {otpErrors.otp && (
            <p className="text-red-500">{otpErrors.otp.message}</p>
          )}

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Xác Nhận OTP
          </button>
        </form>
      )}
      {state == 1 && (
        <form
          onSubmit={handleSubmit(GetOtp)}
          className="w-[45%] p-8 bg-white bg-opacity-80 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              name="fullName"
              // value={formData.fullName}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username")}
              // value={formData.username}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              name="password"
              // value={formData.password}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              {...register("phone")}
              // value={formData.phone}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              // value={formData.email}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Birthday</label>
            <input
              type="date"
              {...register("birthday")}
              // value={formData.birthday}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.birthday && <p>{errors.birthday.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              {...register("address")}
              // value={formData.address}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Gender</label>
            <select
              {...register("gender")}
              // value={formData.gender}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Đăng Ký
          </button>
        </form>
      )}
    </div>
  );
}
