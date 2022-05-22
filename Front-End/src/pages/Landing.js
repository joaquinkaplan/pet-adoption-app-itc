import React, { useState } from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";
import Register from "./Register";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        {/* info */}
        <div className="info">
          <h1 className="app-title">
            <span>#adopt</span>It
          </h1>
          <p>
            "Family means <strong>nobody</strong> gets left behind or
            forgotten.” <em>Lilo & Stitch</em> #AdoptWithResponsibility
          </p>
          <button onClick={handleShow} className="btn btn-hero">
            Login/Register
          </button>
          <Modal show={show} onHide={handleClose}>
            <Register />
          </Modal>

          <Link className="btn btn-hero btn-to-searchpage" to="search-page">
            Search Page
          </Link>
        </div>
        <img src={main} alt="pet park" className="img main-img" />
      </div>
    </Wrapper>
  );
}
