import Wrapper from "../../assets/wrappers/SharedLayout";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar, BigSidebar, SmallSideBar } from "../../components";
export default function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
