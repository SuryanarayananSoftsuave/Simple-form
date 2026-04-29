import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import SideBar from "./sidebar/SideBar";
import Footer from "../Footer";

// MainLayout = the normal app shell with Sidebar + NavBar + Footer.
// <Outlet /> is where the matched child route renders.
function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <div className="content-area">
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="main-content">
          <NavBar />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
