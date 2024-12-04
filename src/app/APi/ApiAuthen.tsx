"use server";
import { cookies } from "next/headers";
export async function accesToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return token ? token : null;
}
export async function OTPget(email: string) {
  const queryParams = new URLSearchParams({
    email: email,
  });
  const res = await fetch(`http://localhost:8080/send?${queryParams}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const statusCode = res.status;
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return statusCode;
}
export async function verifyOTP(OTP: string) {
  const queryParams = new URLSearchParams({
    OTP: OTP,
  });
  const res = await fetch(`http://localhost:8080/verify-otp?${queryParams}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  let check = data.check;
  return check;
}
export async function registers(bodyRequest: any) {
  const res = await fetch(`http://localhost:8080/api/actors/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
    body: JSON.stringify(bodyRequest),
  });
  const data = await res.json();
  return data;
}
export async function signIns(bodyRequest: any) {
  const cookieStore = await cookies();
  const res = await fetch(`http://localhost:8080/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
    body: JSON.stringify(bodyRequest),
  });

  const statusCode = res.status;
  const data = await res.json();
  cookieStore.set("token", data.token);
  return { data, statusCode };
}
export async function SignOut() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return "success";
}
