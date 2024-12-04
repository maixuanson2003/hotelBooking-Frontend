"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function GetsConversation() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token == null) {
    return;
  }
  const res = await fetch(`http://localhost:8080/conversations/API/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
export async function GetsConversationByGroupId(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token == null) {
    return;
  }
  const res = await fetch(`http://localhost:8080/conversations/API/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
