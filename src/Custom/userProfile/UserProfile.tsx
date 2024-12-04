import React from "react";

type UserProfileProps = {
  id: number;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  gender: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  id,
  fullName,
  username,
  phone,
  email,
  birthday,
  address,
  gender,
}) => {
  return (
    <div className="w-[70%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-500 text-white text-center">
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <p className="text-sm">@{username}</p>
      </div>
      <div className="p-6">
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium text-gray-600">Phone</span>
            <span className="text-gray-900">{phone}</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium text-gray-600">Email</span>
            <span className="text-gray-900">{email}</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium text-gray-600">Birthday</span>
            <span className="text-gray-900">{birthday}</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium text-gray-600">Address</span>
            <span className="text-gray-900">{address}</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="font-medium text-gray-600">Gender</span>
            <span className="text-gray-900">{gender}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
