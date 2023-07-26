"use client";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ListUser from "../components/ListUser";
import { useState } from "react";
import DepartementList from "../components/DepartementList";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState("Users");
  return (
    <div className="flex h-screen">
      <Sidebar clicked={(title) => setSidebar(title)} />
      <div className="flex-1 flex flex-col">
        <Header />
        {sidebar === "Users" ? (
          <ListUser />
        ) : "Departements" ? (
          <DepartementList />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
