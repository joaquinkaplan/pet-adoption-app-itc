import { useEffect } from "react";
import { Loading, Pet } from "../../components";
import Wrapper from "../../assets/wrappers/PetsContainer";
import { useAppContext } from "../../context/appContext";

const MyPets = ({ adoptedBy, savedBy }) => {
  const { getAllPets, pets, isLoading, user, clearFilters } = useAppContext();

  useEffect(() => {
    getAllPets();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <h3>{user?.name}'s pets!</h3>
      <p>
        Dear pet lover, in this page you will find the pets you either saved,
        fostered or adopted.
      </p>

      <Wrapper>
        <div className="jobs">
          {pets.map((pet) => {
            if (
              pet.adoptedBy.includes(user._id) ||
              pet.savedBy.includes(user._id)
            ) {
              return (
                <Pet
                  key={pet._id}
                  adoptedBy={adoptedBy}
                  savedBy={savedBy}
                  {...pet}
                />
              );
            }
          })}
        </div>
      </Wrapper>
    </>
  );
};

export default MyPets;
