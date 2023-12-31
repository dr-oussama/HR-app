import { useEffect, useState } from "react";

const Header = () => {
  //const user = localStorage.getItem("user");
  const [cin, setCin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const response = await fetch("/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      const { userCin, lastName, firstName } = result;
      setFirstName(firstName);
      setLastName(lastName);
      setCin(userCin);
    } catch (error) {
      console.log("An error occurred getToken. Please try again later.");
    }
  };
  const adminName = firstName + " " + lastName;
  const adminAvatarUrl = "luffy5.jpg";

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">MyOCP</h1>
      </div>
      <div className="flex items-center">
        <p className="mr-4">{adminName}</p>
        <img
          src={adminAvatarUrl}
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
