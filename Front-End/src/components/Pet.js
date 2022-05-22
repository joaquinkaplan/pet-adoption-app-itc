import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Pet";
import { Modal } from "react-bootstrap";
import { PetMoreInfo, Adopt, Foster, Save, Unsave, Return } from ".";
import { isAdminValid } from "../isAdminValid";

const Pet = ({
  _id,
  pet_name,
  pet_type,
  pet_status,
  pet_color,
  pet_picture,
  pet_height,
  pet_weight,
  pet_dietary_restrictions,
  pet_breed_of,
  pet_bio,
  pet_is_hypoallergenic,
  savedBy,
  adoptedBy,
}) => {
  const {
    setEditPet,
    deletePet,
    isAdmin,
    user,
    setAdoptOrFosterPet,
    clearFilters,
  } = useAppContext();

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showModalAdopt, setShowModalAdopt] = useState(false);
  const [showModalFoster, setShowModalFoster] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalUnsave, setShowModalUnsave] = useState(false);
  const [showModalReturn, setShowModalReturn] = useState(false);

  const handleCloseMoreInfo = () => setShowMoreInfo(false);
  const handleCloseAdopt = () => setShowModalAdopt(false);
  const handleCloseFoster = () => setShowModalFoster(false);
  const handleCloseSave = () => setShowModalSave(false);
  const handleCloseUnsave = () => setShowModalUnsave(false);
  const handleCloseReturn = () => setShowModalReturn(false);

  const editPet = () => {
    setEditPet(_id);
    <Navigate to="/add-pet" />;
  };

  const moreInfo = () => {
    setShowMoreInfo(true);
  };

  const petAdopted = () => {
    setAdoptOrFosterPet(_id);
    setShowModalAdopt(true);
  };

  const petFostered = () => {
    setAdoptOrFosterPet(_id);
    setShowModalFoster(true);
  };

  const petReturned = () => {
    setAdoptOrFosterPet(_id);
    setShowModalReturn(true);
  };

  const petSaved = () => {
    setAdoptOrFosterPet(_id);
    setShowModalSave(true);
  };

  const petUnsaved = () => {
    setAdoptOrFosterPet(_id);
    setShowModalUnsave(true);
  };

  return (
    <Wrapper>
      <header>
        <img className=" pet-img" src={pet_picture} alt="" />
        <div className="info">
          <h5>{pet_name}</h5>
          <p>
            {pet_color} {pet_type}
          </p>
          <p>{pet_status}</p>
        </div>
      </header>
      <div className="content">
        <footer className="pet-footer">
          <Link
            type="button"
            to="#"
            className={isAdmin === isAdminValid ? "btn mb-5" : "btn"}
            onClick={moreInfo}
          >
            More info :)
          </Link>
          <Modal show={showMoreInfo} onHide={handleCloseMoreInfo}>
            <PetMoreInfo
              pet_name={pet_name}
              pet_picture={pet_picture}
              pet_height={pet_height}
              pet_weight={pet_weight}
              pet_type={pet_type}
              pet_color={pet_color}
              pet_breed_of={pet_breed_of}
              pet_status={pet_status}
              pet_is_hypoallergenic={pet_is_hypoallergenic}
              pet_dietary_restrictions={pet_dietary_restrictions}
              pet_bio={pet_bio}
            />
          </Modal>
          <Link
            to="#"
            type="button"
            className={
              (user && pet_status === "available") ||
              (user && adoptedBy.includes(user._id))
                ? "btn mb-5"
                : "d-none"
            }
            onClick={
              user && adoptedBy.includes(user._id) ? petReturned : petAdopted
            }
          >
            {user && adoptedBy.includes(user._id) ? "Return" : "Adopt"}
          </Link>

          <Modal show={showModalAdopt} onHide={handleCloseAdopt}>
            <Adopt />
          </Modal>
          <Modal show={showModalReturn} onHide={handleCloseReturn}>
            <Return />
          </Modal>
          <Link
            to="#"
            type="button"
            className={
              user && pet_status === "available" ? "btn mb-5" : "d-none"
            }
            onClick={petFostered}
          >
            foster
          </Link>
          <Modal show={showModalFoster} onHide={handleCloseFoster}>
            <Foster />
          </Modal>
          <Link
            to="#"
            type="button"
            className={
              !user || (user && adoptedBy.includes(user._id))
                ? "d-none"
                : "btn mb-5"
            }
            onClick={user && savedBy.includes(user._id) ? petUnsaved : petSaved}
          >
            {user && savedBy.includes(user._id) ? "Unsave" : "Save"}
          </Link>
          <Modal show={showModalSave} onHide={handleCloseSave}>
            <Save />
          </Modal>
          <Modal show={showModalUnsave} onHide={handleCloseUnsave}>
            <Unsave />
          </Modal>
        </footer>
        <div className="actions">
          <Link
            to="add-pet"
            className={isAdmin === isAdminValid ? "btn edit-btn" : "d-none"}
            onClick={editPet}
          >
            Edit
          </Link>

          <Link
            to="#"
            type="button"
            className={isAdmin === isAdminValid ? "btn delete-btn" : "d-none"}
            onClick={() => deletePet(_id)}
          >
            Delete
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Pet;
