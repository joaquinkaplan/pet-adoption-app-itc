import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";
import { NavLink } from "react-router-dom";
import patita from "../assets/images/patita.svg";
import { isAdminValid } from "../isAdminValid";

const BigSidebar = () => {
  const { showSidebar, isAdmin, toggleSidebar } = useAppContext();
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
          <NavLinks />
          {isAdmin === isAdminValid ? (
            <NavLink
              to="add-pet"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="icon">
                <img src={patita} alt="logo" className="patita" />
              </span>
              dashboard
            </NavLink>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
