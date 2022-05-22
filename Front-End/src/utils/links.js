import patita from "../assets/images/patita.svg";

const links = [
  {
    id: 1,
    text: "all pets",
    path: "/",
    icon: <img src={patita} alt="logo" className="patita" />,
  },
  {
    id: 3,
    text: "my pets",
    path: "my-pets",
    icon: <img src={patita} alt="logo" className="patita" />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <img src={patita} alt="logo" className="patita" />,
  },
];

export default links;
