"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
export function Header({
  isLoggedIn,
  handleSignOut,
}: {
  isLoggedIn: boolean;
  handleSignOut: () => void;
}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="w-full h-10 bg-orange-600 flex justify-between items-center px-6 text-white text-sm">
        <div className="flex items-center">
          <p>maixuanson2789@gmail.com</p>
        </div>
        <div className="flex space-x-4">
          <Image
            width={20}
            height={20}
            src={"./assets/instagram.svg"}
            alt="Instagram"
          />
          <Image
            width={20}
            height={20}
            src={"./assets/pinterest.svg"}
            alt="Pinterest"
          />
          <Image
            width={20}
            height={20}
            src={"./assets/twitter.svg"}
            alt="Twitter"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-between items-center px-6 h-16">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="text-lg font-bold text-orange-600 cursor-pointer"
        >
          HOTELBOOKING
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-orange-600">
            Home
          </Link>
          <Link
            href="/USER/hotels"
            className="text-gray-600 hover:text-orange-600"
          >
            Khách sạn
          </Link>
          <Link
            href="/USER/festivals"
            className="text-gray-600 hover:text-orange-600"
          >
            Lễ hội
          </Link>
          <Link
            href="/USER/cities"
            className="text-gray-600 hover:text-orange-600"
          >
            Thành phố
          </Link>
          <Link
            href="/USER/Chat"
            className="text-gray-600 hover:text-orange-600"
          >
            Hỗ trợ
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              {/* Avatar */}
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center cursor-pointer"
              >
                {/* Placeholder Avatar: Replace with user image */}
                <span>S</span>
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md text-sm">
                  <li className="p-2 hover:bg-gray-100 flex items-center">
                    <FaUser className="text-gray-500 mr-2" />
                    <Link href="/USER/Profile">Profile</Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100 flex items-center">
                    <AiOutlineCalendar className="text-gray-500 mr-2" />
                    <Link href="/USER/mybooking">My Booking</Link>
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt className="text-gray-500 mr-2" />
                    Sign Out
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => router.push("/AuthFO/signIn")}
                className="px-4 py-2 text-sm text-black bg-white border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/AuthFO/signUP")}
                className="px-4 py-2 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                Signup
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-600">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <Link href="/" className="text-gray-600 hover:text-orange-600">
              Home
            </Link>
            <Link
              href="/USER/hotels"
              className="text-gray-600 hover:text-orange-600"
            >
              Khách sạn
            </Link>
            <Link
              href="/USER/festivals"
              className="text-gray-600 hover:text-orange-600"
            >
              Lễ hội
            </Link>
            <Link
              href="/USER/cities"
              className="text-gray-600 hover:text-orange-600"
            >
              Thành phố
            </Link>
            <Link
              href="/USER/Chat"
              className="text-gray-600 hover:text-orange-600"
            >
              Hỗ trợ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
