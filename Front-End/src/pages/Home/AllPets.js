import { PetsContainer, SearchContainer } from "../../components";
import { useAppContext } from "../../context/appContext";
import React from "react";

export default function AllPets() {
  const { user } = useAppContext();
  return (
    <>
      <h3>Welcome, {user ? user.name : "human"}! </h3>
      <p>
        {user
          ? "Being part of this community entails a big responsibility. This is not an ordinary market place but where you will find alive beings waiting to find someone who love. We stand with #ResponsibleAdoption."
          : "Take a look at the gorgeous animal friends you can find in #AdoptIt."}
      </p>
      <SearchContainer />
      <PetsContainer />
    </>
  );
}
