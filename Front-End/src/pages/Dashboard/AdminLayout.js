import Wrapper from "../../assets/wrappers/SharedLayout";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import {
  AdminBigSidebar,
  AdminSmallSideBar,
} from "../../components/adminComponents";

export default function AdminLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <AdminSmallSideBar />
        <AdminBigSidebar />
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
