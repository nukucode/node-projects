import { Schema } from "mongoose";
import { validateEmail } from "../utils/email";

const User = new Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },

  password: {
    type: String,
    require: true
  },

  profilePic: {
    type: String,
    require: true
  }
});

export { User };
