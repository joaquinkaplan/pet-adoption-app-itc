import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/PetsContainer";
import { useAppContext } from "../../context/appContext";
import { Loading, User } from "../../components";

export default function ListOfUsers() {
  const { getAllUsers, isLoading, users, totalUsers } = useAppContext();

  useEffect(() => {
    getAllUsers();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No pets to show!</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalUsers} {users.length > 1 ? "users" : "user"} found
      </h5>
      <div className="jobs">
        {users.map((user) => {
          return <User key={user._id} {...user} />;
        })}
      </div>
    </Wrapper>
  );
}
