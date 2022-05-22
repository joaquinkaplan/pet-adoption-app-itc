import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Pet";
import { Modal } from "react-bootstrap";
import UserMoreInfo from "./UserMoreInfo";
import { isAdminValid } from "../isAdminValid";

const User = ({ name, email, phone, _id }) => {
  const { isAdmin } = useAppContext();

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleCloseMoreInfo = () => setShowMoreInfo(false);

  const moreInfo = () => {
    setShowMoreInfo(true);
  };

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{name}</h5>
        </div>
      </header>
      <div className="content">
        <footer className="pet-footer">
          <Link
            type="button"
            to="#"
            className={isAdmin === isAdminValid ? "btn mb-5" : "btn"}
            onClick={moreInfo}
          >
            More info :)
          </Link>
          <Modal show={showMoreInfo} onHide={handleCloseMoreInfo}>
            <UserMoreInfo name={name} email={email} phone={phone} _id={_id} />
          </Modal>
        </footer>
      </div>
    </Wrapper>
  );
};

export default User;
