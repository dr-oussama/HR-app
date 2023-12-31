import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  clicked: (name: string) => void;
}

const UserSidebar = ({ clicked }: Props) => {
  const [navTitle, setNavTitle] = useState("Document requests");

  useEffect(() => {
    
  }, []);

  const titles = [
    "Document requests",
    "Documents",
    "Payrolls",
    "Settings",
    "Logout",
  ];

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Done for logout.");
    } catch (error) {
      console.log("An error occurred in logout. Please try again later.");
    }
  };

  return (
    <>
      <aside className="bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li className="mb-2">
              <h2 className="text-xl font-bold">Dashboard</h2>
            </li>
            {titles.map((title) =>
              title !== "Logout" ? (
                <li
                  key={title}
                  className={
                    title == navTitle ? "mb-4 rounded bg-gray-700" : "mb-4"
                  }
                  onClick={() => {
                    setNavTitle(title);
                    clicked(title);
                  }}
                >
                  <a className="block px-2 py-1 rounded hover:bg-gray-700">
                    {title}
                  </a>
                </li>
              ) : (
                <li
                  key={title}
                  className={
                    title == navTitle ? "mb-4 rounded bg-gray-700" : "mb-4"
                  }
                  onClick={() => {
                    setNavTitle(title);
                    clicked(title);
                  }}
                >
                  <Link
                    href={"../"}
                    className="block px-2 py-1 rounded hover:bg-gray-700"
                    onClick={() => {
                      logout();
                    }}
                  >
                    {title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
