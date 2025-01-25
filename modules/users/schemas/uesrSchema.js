import { joi } from "../../../shared/constants/index.js";

const emailSchema = joi.object({
  email: joi.string().email().required(),
});
const passwordSchema = joi.object({
  password: joi
    .string()
    .required()
    .min(8)

    .messages({
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
      "string.empty": "Password is required.",
    }),
});
const loginUserSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(8).messages({
    "string.pattern.base":
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 20 characters.",
    "string.empty": "Password is required.",
  }),
});

const registerUserSchema = joi.object({
  username: joi.string().required().min(3).max(50).messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name cannot exceed 50 characters.",
  }),
  email: joi.string().required().email().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  cnic: joi
    .string()
    .required()
    .length(13)
    .pattern(/^\d{13}$/)
    .messages({
      "string.empty": "CNIC is required.",
      "string.length": "CNIC must be exactly 13 digits.",
      "string.pattern.base": "CNIC must contain only numbers.",
    }),
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
  passwordSchema,
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
};
