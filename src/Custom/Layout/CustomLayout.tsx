"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SignOut } from "@/app/APi/ApiAuthen";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "./Footer";
import { Header } from "./Header";
interface Props {
  children: React.ReactNode;
  token: any;
}
export function LayoutCustom({ children, token }: Props) {
  const router = useRouter();
  const [tokens, setTokens] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Check, setCheck] = useState<any>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const handleSignOut = async () => {
    let s: string = await SignOut();
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("hotelid");
    setTokens(null);
    setIsLoggedIn(false);
    setType("");
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const userType = localStorage.getItem("type");

    if (token) {
      setTokens(token);
      // window.location.reload();
      setIsLoggedIn(true);
      setType(userType || "");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, []);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      {children}
      <Footer />
    </div>
  );
}
