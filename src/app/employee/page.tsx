"use client";

import Header from "../components/Header";
import { useState } from "react";
import UserSidebar from "../components/UserSideBar";
import PayrollsList from "../components/PayrollsList";
import RequestListUser from "../components/RequestListUser";
import DocumentList from "../components/DocumentList";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState("Document requests");
  return (
    <div className="flex h-screen">
      <UserSidebar clicked={(title) => setSidebar(title)} />
      <div className="flex-1 flex flex-col">
        <Header />
        {sidebar === "Document requests" ? (
          <RequestListUser />
        ) : sidebar === "Documents" ? (
          <DocumentList />
        ) : sidebar === "Payrolls" ? (
          <PayrollsList />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
