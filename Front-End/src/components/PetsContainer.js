import { useEffect } from "react";
import Loading from "./Loading";
import Pet from "./Pet";
import Wrapper from "../assets/wrappers/PetsContainer";
import { useAppContext } from "../context/appContext";

const PetsContainer = () => {
  const {
    getAllPets,
    pets,
    isLoading,
    totalPets,
    pet_name,
    pet_type,
    pet_status,
    pet_color,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllPets();
  }, [pet_name, pet_type, pet_status, pet_color, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (pets.length === 0) {
    return (
      <Wrapper>
        <h2>No pets to show!</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalPets} {pets.length > 1 ? "pets" : "pet"} found
      </h5>
      <div className="jobs">
        {pets.map((pet) => {
          return <Pet key={pet._id} {...pet} />;
        })}
      </div>
    </Wrapper>
  );
};

export default PetsContainer;
