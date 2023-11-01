import Link from "next/link";
import { useState } from "react";

interface Props {
  clicked: (name: string) => void;
}

const Sidebar = ({ clicked }: Props) => {
  const [navTitle, setNavTitle] = useState("Users");
  const titles = [
    "Users",
    "Departements",
    "Document requests",
    "Settings",
    "Logout",
  ];
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
                    console.log(title);
                  }}
                >
                  <a
                    className="block px-2 py-1 rounded hover:bg-gray-700"
                  >
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
                    href={'../'}
                    className="block px-2 py-1 rounded hover:bg-gray-700"
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

export default Sidebar;
