import { useAppContext } from "../context/appContext";

const Foster = () => {
  const { fosterPet, user } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    fosterPet();
  };
  return (
    <button type="submit" className="btn" onClick={handleSubmit}>
      <ul>
        <p>TERMS AND AGREEMENTS</p>
        <p>
          1- I, {user?.name}, understand that fostering a pet implies taking
          responsability for the term of 1 (one) year, and that not fulfilling
          it is against the law.
        </p>
        <p>
          2- I, {user?.name}, press anywhere in this T&A contract to accept and
          foster the pet.
        </p>
      </ul>
    </button>
  );
};

export default Foster;
