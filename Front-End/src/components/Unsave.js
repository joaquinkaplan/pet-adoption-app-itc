import { useAppContext } from "../context/appContext";

const Unsave = () => {
  const { unsavePet } = useAppContext();

  const handleSubmit = () => {
    unsavePet();
  };
  return (
    <button type="button" className="btn" onClick={handleSubmit}>
      Press here to UNSAVE the pet.
    </button>
  );
};

export default Unsave;
