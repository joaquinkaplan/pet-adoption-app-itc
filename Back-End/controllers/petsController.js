import Pet from "../models/Pet.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createPet = async (req, res) => {
  const pet = await Pet.create(req.body);
  res.status(StatusCodes.CREATED).json({
    pet: {
      name: pet.pet_name,
      type: pet.pet_type,
      color: pet.pet_color,
      picture: pet.pet_picture,
    },
  });
};

const getAllPets = async (req, res) => {
  const { pet_name, pet_type, pet_status, pet_color, sort } = req.query;
  const queryObject = {};
  if (pet_type) {
    queryObject.pet_type = pet_type;
  }
  if (pet_status && pet_status != "All") {
    queryObject.pet_status = pet_status;
  }
  if (pet_name) {
    queryObject.pet_name = { $regex: pet_name, $options: "i" };
  }
  if (pet_color) {
    queryObject.pet_color = pet_color;
  }
  let result = Pet.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const pets = await result;
  res
    .status(StatusCodes.OK)
    .json({ pets, totalPets: pets.length, numOfPages: 1 });
};

const updatePet = async (req, res) => {
  const { id: petId } = req.params;
  const { pet_name, pet_status, pet_type, pet_color } = req.body;

  if (!pet_name || !pet_status || !pet_type || !pet_color) {
    throw new BadRequestError("Please provide all values");
  }

  const pet = await Pet.findOne({ _id: petId });

  if (!pet) {
    throw NotFoundError(`No pet with id: ${petId}`);
  }

  const updatedPet = await Pet.findOneAndUpdate({ _id: petId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedPet });
};

const adoptOrFosterPet = async (req, res) => {
  const { id: petId } = req.params;
  const { pet_status, adoptedBy } = req.body;

  if (!pet_status || !adoptedBy) {
    throw new BadRequestError(
      "you are not executing the adopt function. please provide all values"
    );
  }

  const pet = await Pet.findOne({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id: ${petId}`);
  }

  const adoptedOrFosteredPet = await Pet.findOneAndUpdate(
    { _id: petId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ adoptedOrFosteredPet });
};

const returnPet = async (req, res) => {
  const { id: petId } = req.params;
  const { adoptedBy } = req.body;

  if (!adoptedBy) {
    throw new BadRequestError(
      "you are not executing the return function. please provide all values"
    );
  }

  const pet = await Pet.findOne({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id: ${petId}`);
  }

  const returnedPet = await Pet.findOneAndUpdate(
    { _id: petId },
    {
      pet_status: "available",
      adoptedBy: "",
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ returnedPet });
};

const deletePet = async (req, res) => {
  const { id: petId } = req.params;

  const pet = await Pet.findOne({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id: ${petId}`);
  }

  // checkPermissions(req.user, pet.createdBy);

  await pet.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Pet removed" });
};

const savePet = async (req, res) => {
  const { id: petId } = req.params;
  const { savedBy } = req.body;

  if (!savedBy) {
    throw new BadRequestError(
      "you are not executing the save function. please provide all values"
    );
  }

  const pet = await Pet.findOne({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id: ${petId}`);
  }

  const savedPet = await Pet.findOneAndUpdate(
    { _id: petId },
    {
      $push: { savedBy },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ savedPet });
};

const unsavePet = async (req, res) => {
  const { id: petId } = req.params;
  const { savedBy } = req.body;

  if (!savedBy) {
    throw new BadRequestError(
      "you are not executing the unsave function. please provide all values"
    );
  }

  const pet = await Pet.findOne({ _id: petId });

  if (!pet) {
    throw new NotFoundError(`No pet with id: ${petId}`);
  }

  const unsavedPet = await Pet.findOneAndUpdate(
    { _id: petId },
    {
      $pull: { savedBy },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ unsavedPet });
};

const showStats = async (req, res) => {
  res.send("showStats");
};

export {
  createPet,
  getAllPets,
  updatePet,
  deletePet,
  showStats,
  adoptOrFosterPet,
  savePet,
  returnPet,
  unsavePet,
};
