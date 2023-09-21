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

  const {
    picture,
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_title,
  } = users;

  return (
    <div className="min-h-screen bg-blue-500 p-4">
      <div className="flex flex-col items-center mt-8">
        <Avatar size="large" url={picture} />
        <h2 className="text-3xl font-bold mt-4 text-white">{`${first_name} ${last_name}`}</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">User Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-800">Email:</p>
            <p className="text-gray-600">{email}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Phone Number:</p>
            <p className="text-gray-600">{phone_number}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Hire Date:</p>
            <p className="text-gray-600">{new Date(hire_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Job Title:</p>
            <p className="text-gray-600">{job_title}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Payrolls</h3>
        {/* Add payroll information here */}
      </div>
    </div>
  );
};

export default UserProfilePage;
