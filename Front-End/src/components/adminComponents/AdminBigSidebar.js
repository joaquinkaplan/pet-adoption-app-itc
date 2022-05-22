import Wrapper from "../../assets/wrappers/BigSidebar";
import AdminNavLinks from "./AdminNavLinks";
import Logo from "../Logo";
import { useAppContext } from "../../context/appContext";

const AdminBigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <AdminNavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminBigSidebar;
