import React, { useState } from "react";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";

const Content = () => {
  const [selectedTab, setSelectedTab] = useState("INBOX");

  return (
    <section className="content">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Tasks selectedTab={selectedTab}></Tasks>
    </section>
  );
};

export default Content;
