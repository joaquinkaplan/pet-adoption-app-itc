import React, { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
const initialState = {
  name: "",
  email: "",
  password: "",
  repeat: "",
  phone: "",
  isMember: true,
  isAdmin: false,
};

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setUpUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, repeat, isMember, phone, isAdmin } = values;
    if (
      !isMember &&
      (!email ||
        !password ||
        password !== repeat ||
        !phone ||
        (!isMember && !name))
    ) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password, phone, isAdmin };

    if (isMember) {
      setUpUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setUpUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && (
          <>
            <FormRow
              type="password"
              labelText="password (again!)"
              name="repeat"
              value={values.repeat}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="phone"
              value={values.phone}
              handleChange={handleChange}
            />
          </>
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
