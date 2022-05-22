import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

import {
  createPet,
  getAllPets,
  updatePet,
  deletePet,
  showStats,
  adoptOrFosterPet,
  savePet,
  returnPet,
  unsavePet,
} from "../controllers/petsController.js";

router.route("/").post(createPet).get(getAllPets);

router.route("/stats").get(showStats);

router.route("/:id").delete(deletePet).patch(authenticateUser, updatePet);

router.route("/adopt/:id").patch(authenticateUser, adoptOrFosterPet);
router.route("/return/:id").patch(authenticateUser, returnPet);

router.route("/save/:id").patch(authenticateUser, savePet);
router.route("/unsave/:id").patch(authenticateUser, unsavePet);

export default router;
