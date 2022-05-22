import patita from "../assets/images/patita.svg";

const links = [
  {
    id: 1,
    text: "to home page",
    path: "/",
    icon: <img src={patita} alt="logo" className="patita" />,
  },
  {
    id: 2,
    text: "add pet",
    path: "",
    icon: <img src={patita} alt="logo" className="patita" />,
  },
  {
    id: 3,
    text: "list of users",
    path: "users-and-pets",
    icon: <img src={patita} alt="logo" className="patita" />,
  },
];

export default links;
