import adminLinks from "../../utils/adminLinks";
import { NavLink } from "react-router-dom";

const AdminNavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {adminLinks.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) => (isActive ? "nav-link" : "nav-link")}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default AdminNavLinks;
