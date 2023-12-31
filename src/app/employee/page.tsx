"use client";

import Header from "../components/Header";
import ListUser from "../components/ListUser";
import { useState } from "react";
import DepartementList from "../components/DepartementList";
import RequestList from "../components/RequestList";
import UserSidebar from "../components/UserSideBar";
import PayrollsList from "../components/PayrollsList";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState("Users");
  return (
    <div className="flex h-screen">
      <UserSidebar clicked={(title) => setSidebar(title)} />
      <div className="flex-1 flex flex-col">
        <Header />
        {sidebar === "Document requests" ? (
          <ListUser />
        ) : sidebar === "Documents" ? ( 
          <DepartementList />
        ) : sidebar === "Payrolls" ? ( 
          <PayrollsList />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
