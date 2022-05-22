import { useAppContext } from "../context/appContext";

const Adopt = () => {
  const { adoptPet, user } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    adoptPet();
  };
  return (
    <button type="submit" className="btn" onClick={handleSubmit}>
      <ul>
        <p>TERMS AND AGREEMENTS</p>
        <p>
          1- I, {user?.name}, understand that adopting a pet implies a
          responsability, and that not fulfilling it is against the law.
        </p>
        <p>
          2- I, {user?.name}, promise to give this pet all the love it diserves.
        </p>
        <p>
          3- I, {user?.name}, am acknowledged about all the specific
          characteristics that make this pet in what respects to care
          proceedures, feeding, and health in general.
        </p>
        <p>
          4- I, {user?.name}, press anywhere in this T&A contract to accept and
          adopt the pet.
        </p>
      </ul>
    </button>
  );
};

export default Adopt;
