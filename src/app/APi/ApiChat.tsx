"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function sendMessage(datasend: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token == null) {
    return;
  }
  const res = await fetch(`http://localhost:8080/chat/API/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(datasend),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
