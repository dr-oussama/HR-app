"use client";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ListUser from "../components/ListUser";
import { useState } from "react";
import DepartementList from "../components/DepartementList";
import RequestList from "../components/RequestList";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState("Users");
  return (
    <div className="flex h-screen">
      <Sidebar clicked={(title) => setSidebar(title)} />
      <div className="flex-1 flex flex-col">
        <Header />
        {sidebar === "Users" ? (
          <ListUser />
        ) : sidebar === "Departements" ? ( 
          <DepartementList />
        ) : sidebar === "Document requests" ? ( 
          <RequestList />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
