import { joi } from "../../../shared/constants/index.js";

const emailSchema = joi.object({
  email: joi.string().email().required(),
});

const loginUserSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(3).max(8),
});

const registerUserSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().alphanum().required().min(3).max(8),
});

const updateProfileSchema = joi.object({
  fullName: joi.string().required().max(50).required().label("Full Name"),
  username: joi.string().min(3).max(30).required().label("Username"),
  email: joi.string().email().required().label("Email Address"),
  password: joi.string().min(8).required().label("Password (Hashed)"),
  phoneNumber: joi.string().required().label("Phone Number"),
  profilePicture: joi
    .string()
    .uri()
    .optional()
    .label("Profile Picture (Photo URL)"),
  shippingAddress: joi.string().required().label("Shipping Address"),
  gender: joi
    .string()
    .valid("Male", "Female", "Other")
    .optional()
    .label("Gender"),
  dateOfBirth: joi.date().optional().label("Date of Birth"),
  accountStatus: joi
    .string()
    .valid("Active", "Inactive")
    .required()
    .label("Account Status"),
  role: joi.string().valid("User", "Admin").required().label("Role"),
});

export {
  emailSchema,
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
};
