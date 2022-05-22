import { useAppContext } from "../context/appContext";

const Save = () => {
  const { savePet, user } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    savePet();
  };
  return (
    <button type="submit" className="btn" onClick={handleSubmit}>
      Press here to confirm and save the pet.
    </button>
  );
};

export default Save;
