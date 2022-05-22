import mongoose from "mongoose";
import validator from "validator";

const PetSchema = new mongoose.Schema(
  {
    pet_name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
    },
    pet_type: {
      type: String,
      required: [true, "Please provide pet type"],
      maxlength: 100,
    },
    pet_status: {
      type: String,
      required: true,
      enum: ["available", "adopted", "fostered"],
      default: "available",
    },
    adoptedBy: {
      type: String,
      default: "",
    },
    savedBy: {
      type: Array,
      default: [],
    },
    pet_picture: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "please provide an URL for the pet picture",
      },
    },
    pet_color: {
      type: String,
      required: [true, "please provide color"],
      default: "",
    },
    pet_height: {
      type: String,
      default: "",
    },
    pet_weight: {
      type: String,
      default: "",
    },
    pet_is_hypoallergenic: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    pet_dietary_restrictions: {
      type: String,
      default: "",
    },
    pet_breed_of: {
      type: String,
      default: "",
    },
    pet_bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", PetSchema);
