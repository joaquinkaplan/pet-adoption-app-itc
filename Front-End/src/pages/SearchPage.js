import { Link } from "react-router-dom";
import { AllPets } from "./Home";

const SearchPage = () => {
  return (
    <>
      <Link className="btn btn-block" to="/landing">
        to landing page
      </Link>
      <AllPets />
    </>
  );
};

export default SearchPage;
