import Wrapper from "../assets/wrappers/Pet";
import { useAppContext } from "../context/appContext";

const UserMoreInfo = ({ name, email, phone, _id }) => {
  return (
    <Wrapper>
      <header>
        <ul>
          <li>
            <strong>- User name:</strong> {name}
          </li>
          <li>
            <strong>- {name}'s e-mail address:</strong> {email}
          </li>
          <li>
            <strong>- {name}'s phone number:</strong> {phone}
          </li>
          <li>
            <strong>- {name}'s id:</strong> {_id}
          </li>
        </ul>
      </header>
    </Wrapper>
  );
};

export default UserMoreInfo;
