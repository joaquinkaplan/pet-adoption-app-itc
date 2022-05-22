import React, { useReducer, useContext } from "react";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_PET_BEGIN,
  CREATE_PET_SUCCESS,
  CREATE_PET_ERROR,
  GET_PETS_BEGIN,
  GET_PETS_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  SET_EDIT_PET,
  EDIT_PET_BEGIN,
  EDIT_PET_SUCCESS,
  EDIT_PET_ERROR,
  DELETE_PET_BEGIN,
  CLEAR_FILTERS,
  SET_ADOPT_PET,
  ADOPT_PET_BEGIN,
  ADOPT_PET_SUCCESS,
  RETURN_PET_BEGIN,
  RETURN_PET_SUCCESS,
  SAVE_PET_BEGIN,
  SAVE_PET_SUCCESS,
  UNSAVE_PET_BEGIN,
  UNSAVE_PET_SUCCESS,
} from "./actions";
import reducer from "./reducers";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
const isAdmin = localStorage.getItem("isAdmin");

const initialState = {
  // AUTH STATE
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  users: [],
  totalUsers: 0,
  name: "",
  email: "",
  phone: "",
  _id: "",
  token: token,
  userLocation: userLocation || "",

  //PET STATE

  petLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editPetId: "",
  pet_name: "",
  pet_type: "",
  petStatusOptions: ["available", "adopted", "fostered"],
  pet_status: "",
  adoptedBy: "",
  pet_color: "",
  pet_picture: "",
  pet_height: "",
  pet_weight: "",
  pet_is_hypoallergenic: "no",
  petIsHypoallergenicOptions: ["yes", "no"],
  pet_dietary_restrictions: "",
  pet_breed_of: "",
  pet_bio: "",
  pets: [],
  totalPets: 0,
  myAdoptedPets: [],
  myTotalAdoptedPets: [],
  numOfPages: 1,
  page: 1,
  sort: "latest",
  sortOptions: ["latest", "oldest"],
  savedBy: [],

  //IS ADMIN
  isAdmin: isAdmin,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //AUTH FETCH
  const authFetch = axios.create({
    baseURL: "http://localhost:5000/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      Promise.reject(error.response);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      Promise.reject(error);
    }
  );

  //-------------------------------------------------
  //-------------------------------------------------
  //-------------------------------------------------
  /*AUTH FUNCTIONS */
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token, location, isAdmin }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
    localStorage.setItem("isAdmin", isAdmin);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
    localStorage.removeItem("isAdmin");
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 4500);
  };

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const URL = "http://localhost:5000/api/v1/auth/";
      console.log(currentUser);
      const { data } = await axios.post(`${URL}${endPoint}`, currentUser);

      const { user, token, location, isAdmin } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
          isAdmin,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
        isAdmin,
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          location,
          token,
        },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  //-------------------------------------------------
  //-------------------------------------------------
  //-------------------------------------------------
  /*PET FUNCTIONS */

  const createPet = async () => {
    dispatch({ type: CREATE_PET_BEGIN });
    try {
      const {
        pet_name,
        pet_type,
        pet_status,
        pet_color,
        pet_picture,
        adoptedBy,
        savedBy,
        pet_height,
        pet_weight,
        pet_is_hypoallergenic,
        pet_dietary_restrictions,
        pet_breed_of,
        pet_bio,
      } = state;

      await axios.post("http://localhost:5000/api/v1/pets", {
        pet_name,
        pet_type,
        pet_status,
        pet_color,
        pet_picture,
        adoptedBy,
        savedBy,
        pet_height,
        pet_weight,
        pet_is_hypoallergenic,
        pet_dietary_restrictions,
        pet_breed_of,
        pet_bio,
      });

      dispatch({ type: CREATE_PET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const getAllPets = async () => {
    const { pet_name, pet_type, pet_color, pet_status, sort } = state;
    let url = `/pets?pet_status=${pet_status}&pet_name=${pet_name}&pet_type=${pet_type}&pet_color=${pet_color}&sort=${sort}`;
    dispatch({ type: GET_PETS_BEGIN });
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1${url}`);
      const { pets, totalPets } = data;
      dispatch({
        type: GET_PETS_SUCCESS,
        payload: {
          pets,
          totalPets,
        },
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const getAllUsers = async () => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/auth/getAllUsers"
      );
      const { users, totalUsers } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users,
          totalUsers,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setEditPet = (id) => {
    dispatch({ type: SET_EDIT_PET, payload: { id } });
  };

  const editPet = async () => {
    dispatch({ type: EDIT_PET_BEGIN });
    try {
      const {
        pet_name,
        pet_type,
        pet_status,
        pet_color,
        pet_picture,
        pet_height,
        pet_weight,
        adoptedBy,
        pet_is_hypoallergenic,
        pet_dietary_restrictions,
        pet_breed_of,
        pet_bio,
      } = state;
      await authFetch.patch(`/pets/${state.editPetId}`, {
        pet_name,
        pet_type,
        pet_status,
        pet_color,
        pet_picture,
        pet_height,
        pet_weight,
        adoptedBy,
        pet_is_hypoallergenic,
        pet_dietary_restrictions,
        pet_breed_of,
        pet_bio,
      });
      dispatch({ type: EDIT_PET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deletePet = async (petId) => {
    dispatch({ type: DELETE_PET_BEGIN });
    try {
      if (
        window.confirm("you sure, admin? deleting this pet is permanent :(") ==
        false
      ) {
        getAllPets();
      } else {
        await authFetch.delete(`/pets/${petId}`);
        getAllPets();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const setAdoptOrFosterPet = (id) => {
    dispatch({ type: SET_ADOPT_PET, payload: { id } });
  };

  const adoptPet = async () => {
    dispatch({ type: ADOPT_PET_BEGIN });
    try {
      const { user } = state;

      await authFetch.patch(`/pets/adopt/${state.editPetId}`, {
        pet_status: "adopted",
        adoptedBy: user._id,
      });

      dispatch({
        type: ADOPT_PET_SUCCESS,
      });
      window.location.reload();
      console.log(state);
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const returnPet = async () => {
    dispatch({ type: RETURN_PET_BEGIN });
    try {
      const { user } = state;

      await authFetch.patch(`/pets/return/${state.editPetId}`, {
        pet_status: "available",
        adoptedBy: user._id,
      });
      dispatch({
        type: RETURN_PET_SUCCESS,
      });
      window.location.reload();
      console.log(state);
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const fosterPet = async () => {
    dispatch({ type: ADOPT_PET_BEGIN });
    try {
      const { user } = state;

      await authFetch.patch(`/pets/adopt/${state.editPetId}`, {
        pet_status: "fostered",
        adoptedBy: user._id,
      });
      console.log(user._id);
      dispatch({
        type: ADOPT_PET_SUCCESS,
      });
      window.location.reload();
      console.log(state);
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      console.log(error);
    }
    clearAlert();
  };

  const savePet = async () => {
    dispatch({ type: SAVE_PET_BEGIN });
    try {
      const { user } = state;

      await authFetch.patch(`/pets/save/${state.editPetId}`, {
        savedBy: user._id,
      });

      dispatch({
        type: SAVE_PET_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const unsavePet = async () => {
    dispatch({ type: UNSAVE_PET_BEGIN });
    try {
      const { user } = state;

      await authFetch.patch(`/pets/unsave/${state.editPetId}`, {
        savedBy: user._id,
      });

      dispatch({
        type: UNSAVE_PET_SUCCESS,
      });
      window.location.reload();
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        getAllUsers,
        toggleSidebar,
        logoutUser,
        updateUser,
        createPet,
        getAllPets,
        handleChange,
        clearValues,
        setEditPet,
        deletePet,
        editPet,
        clearFilters,
        adoptPet,
        fosterPet,
        returnPet,
        setAdoptOrFosterPet,
        savePet,
        unsavePet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
