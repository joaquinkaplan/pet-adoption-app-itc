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
  DELETE_PET_BEGIN,
  EDIT_PET_BEGIN,
  EDIT_PET_SUCCESS,
  EDIT_PET_ERROR,
  CLEAR_FILTERS,
  SET_ADOPT_PET,
  ADOPT_PET_BEGIN,
  ADOPT_PET_SUCCESS,
  SAVE_PET_BEGIN,
  SAVE_PET_SUCCESS,
  UNSAVE_PET_BEGIN,
  UNSAVE_PET_SUCCESS,
  RETURN_PET_BEGIN,
  RETURN_PET_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all required values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      petLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      isAdmin: false,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      petLocation: "",
      userLocation: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      petLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      isAdmin: false,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CREATE_PET_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Pet Created!",
    };
  }
  if (action.type === CREATE_PET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_PETS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_PETS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      pets: action.payload.pets,
      totalPets: action.payload.totalPets,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === GET_USERS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      users: action.payload.users,
      totalUsers: action.payload.totalUsers,
    };
  }

  if (action.type === SET_EDIT_PET) {
    const pet = state.pets.find((pet) => pet._id === action.payload.id);
    const {
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
    } = pet;
    return {
      ...state,
      isEditing: true,
      editPetId: _id,
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
    };
  }

  if (action.type === SET_ADOPT_PET) {
    const pet = state.pets.find((pet) => pet._id === action.payload.id);
    const { _id } = pet;
    return {
      ...state,
      editPetId: _id,
    };
  }

  if (action.type === EDIT_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Updated!",
    };
  }
  if (action.type === EDIT_PET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === ADOPT_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === ADOPT_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      pet_status: "All",
    };
  }

  if (action.type === RETURN_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === RETURN_PET_SUCCESS) {
    return {
      ...state,
      adoptedBy: "",
      isLoading: false,
      pet_status: "All",
    };
  }

  if (action.type === SAVE_PET_BEGIN) {
    return { ...state, isLoading: true, pet_status: "All" };
  }
  if (action.type === SAVE_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      pet_status: "All",
    };
  }

  if (action.type === UNSAVE_PET_BEGIN) {
    return { ...state, isLoading: true, pet_status: "All" };
  }
  if (action.type === UNSAVE_PET_SUCCESS) {
    return {
      ...state,

      pet_status: "All",
      isLoading: false,
    };
  }

  if (action.type === DELETE_PET_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CLEAR_FILTERS) {
    return { ...state, pet_name: "", pet_status: "All", sort: "latest" };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editPetId: "",
      pet_name: "",
      pet_type: "",
      pet_status: "",
      pet_color: "",
      pet_picture: "",
      pet_height: "",
      pet_weight: "",
      pet_is_hypoallergenic: "",
      pet_dietary_restrictions: "",
      pet_breed_of: "",
      pet_bio: "",
    };

    return {
      ...state,
      ...initialState,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
