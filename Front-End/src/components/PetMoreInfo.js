import Wrapper from "../assets/wrappers/Pet";
import { useAppContext } from "../context/appContext";

const PetMoreInfo = ({
  _id,
  pet_name,
  pet_type,
  pet_status,
  pet_color,
  pet_picture,
  pet_height,
  pet_weight,
  pet_is_hypoallergenic,
  pet_dietary_restrictions,
  pet_breed_of,
  pet_bio,
}) => {
  const { user } = useAppContext();
  return (
    <Wrapper>
      <header>
        <h3>
          Hi {user?.name}, I'm {pet_name}!
        </h3>
        <img className="pet-img-modal" src={pet_picture} />
        <div className="info">
          <span>
            I'm a {pet_color} {pet_breed_of} {pet_type}, as nice and funny as
            you could never have imagined! I was named {pet_name} after... well,
            guess it yourself!{" "}
          </span>

          <span>
            {pet_height ? `I am ${pet_height} tall` : ""}
            {pet_weight ? `, and my weight is ${pet_weight}` : ""}
            {pet_dietary_restrictions
              ? `. I can't eat ${pet_dietary_restrictions}. `
              : ". I have no dietary restrictions :)"}
          </span>

          <span>
            {pet_status === "available"
              ? "Can you believe no one has adopted me yet? C'mon, I want to be part of your family!"
              : ""}
            {pet_status === "adopted" || pet_status === "fostered"
              ? "Luckily, someone as generous as you are has welcomed me in a new family. Still, I have a lot of brothers and sisters out there waiting to be adopted :)"
              : ""}
          </span>

          <span>
            {pet_is_hypoallergenic === "yes"
              ? " Don't forget I'm hypoallergenic!"
              : ""}
          </span>
          <p></p>
          <span>{pet_bio ? `${pet_bio}` : ""}</span>
        </div>
      </header>
    </Wrapper>
  );
};

export default PetMoreInfo;
