"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getOne } from "../../hooks/useUsers";
import Avatar from "../../components/Avatar";

const UserProfilePage = () => {
  const router = useParams();
  if (!router) return null;
  const id = router["id"];
  const { users, isLoading } = getOne(Number(id));
  const [user, setUser] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!users) {
    return <div>User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-4">
      <div className="flex flex-col items-center mt-8">
        <Avatar size="large" url={users.picture} />
        <h2 className="text-3xl font-bold mt-4 text-white">{`${users.first_name} ${users.last_name}`}</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
        <p className="text-lg font-semibold text-gray-800">Email:</p>
        <p className="text-gray-600">{users.email}</p>
        <p className="text-lg font-semibold text-gray-800 mt-4">Phone Number:</p>
        <p className="text-gray-600">{users.phone_number}</p>
        <p className="text-lg font-semibold text-gray-800 mt-4">Hire Date:</p>
        <p className="text-gray-600">{users.hire_date}</p>
        <p className="text-lg font-semibold text-gray-800 mt-4">Job Title:</p>
        <p className="text-gray-600">{users.job_title}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Payrolls</h3>
      </div>
    </div>
  );
};

export default UserProfilePage;
