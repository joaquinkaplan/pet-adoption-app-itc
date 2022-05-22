import React from "react";
import { useAppContext } from "../../context/appContext";
import { FormRow, FormRowSelect, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

export default function AddPet() {
  const {
    isLoading,
    showAlert,
    displayAlert,
    pet_name,
    pet_type,
    pet_status,
    petStatusOptions,
    pet_color,
    pet_picture,
    pet_height,
    pet_weight,
    pet_is_hypoallergenic,
    petIsHypoallergenicOptions,
    pet_dietary_restrictions,
    pet_breed_of,
    pet_bio,
    handleChange,
    clearValues,
    createPet,
    editPet,
    isEditing,
  } = useAppContext();

  const handleSubmit = () => {
    if (isEditing) {
      editPet();
      return;
    } else if ((pet_name, pet_type, pet_color, pet_picture)) {
      createPet();
    } else {
      displayAlert();
    }
  };

  const handlePetInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit pet" : "add pet"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Pet name *"
            name="pet_name"
            value={pet_name}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Pet type *"
            name="pet_type"
            value={pet_type}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Pet color *"
            name="pet_color"
            value={pet_color}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Pet picture (URL) *"
            name="pet_picture"
            value={pet_picture}
            handleChange={handlePetInput}
          ></FormRow>

          <FormRowSelect
            name="pet_status"
            labelText="pet status *"
            value={pet_status}
            handleChange={handlePetInput}
            list={petStatusOptions}
          ></FormRowSelect>

          <FormRowSelect
            name="pet_is_hypoallergenic"
            labelText="is hypoallergenic?"
            value={pet_is_hypoallergenic}
            handleChange={handlePetInput}
            list={petIsHypoallergenicOptions}
          ></FormRowSelect>

          <FormRow
            type="text"
            labelText="Pet height"
            name="pet_height"
            value={pet_height}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Pet weight"
            name="pet_weight"
            value={pet_weight}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Breed of the pet"
            name="pet_breed_of"
            value={pet_breed_of}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Dietary restrictions"
            name="pet_dietary_restrictions"
            value={pet_dietary_restrictions}
            handleChange={handlePetInput}
          ></FormRow>
          <FormRow
            type="text"
            labelText="Pet bio"
            name="pet_bio"
            value={pet_bio}
            handleChange={handlePetInput}
          ></FormRow>

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
