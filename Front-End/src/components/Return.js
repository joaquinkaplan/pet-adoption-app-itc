import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Return = () => {
  const { returnPet, user } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    returnPet();
  };
  return (
    <button type="submit" className="btn" onClick={handleSubmit}>
      <span>
        Why, {user?.name}, why? You are on time of pressing anywhere else
        outside this box and keeping me in your family.
      </span>
    </button>
  );
};

export default Return;
