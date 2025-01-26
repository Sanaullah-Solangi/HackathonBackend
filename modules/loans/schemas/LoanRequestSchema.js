import { joi } from "../../../shared/constants/index.js";
// Guarantor Validation Schema
const guarantorValidationSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Guarantor name is required",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Guarantor email is required",
  }),
  cnic: joi
    .string()
    .pattern(/^\d{13}$/)
    .required()
    .messages({
      "string.pattern.base": "CNIC must be 13 digits",
      "string.empty": "Guarantor CNIC is required",
    }),
});

// Loan Details Validation Schema
const loanDetailsValidationSchema = joi.object({
  loanCategory: joi
    .string()
    .valid("Wedding", "Home Construction", "Business Startup", "Education")
    .required()
    .messages({
      "any.only":
        "Loan category must be one of Wedding, Home Construction, Business Startup, or Education",
      "string.empty": "Loan category is required",
    }),
  loanSubcategory: joi.string().required().messages({
    "string.empty": "Loan subcategory is required",
  }),
  loanAmount: joi.number().min(10000).max(1000000).required().messages({
    "number.min": "Loan amount should be at least 10,000 PKR",
    "number.max": "Loan amount should not exceed 1,000,000 PKR",
    "number.empty": "Loan amount is required",
  }),
});

// Personal Information Validation Schema
const personalInfoValidationSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Personal name is required",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Personal email is required",
  }),
  cnic: joi
    .string()
    .pattern(/^\d{13}$/)
    .required()
    .messages({
      "string.pattern.base": "CNIC must be 13 digits",
      "string.empty": "Personal CNIC is required",
    }),
  phone: joi.string().required().messages({
    "string.empty": "Phone number is required",
  }),
  address: joi.string().required().messages({
    "string.empty": "Address is required",
  }),
});

// Main Loan Request Validation Schema
const loanRequestValidationSchema = joi.object({
  loanDetails: loanDetailsValidationSchema.required(),
  guarantor1: guarantorValidationSchema.required(),
  guarantor2: guarantorValidationSchema.required(),
  personalInfo: personalInfoValidationSchema.required(),
  userId: joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
  tokenNumber: joi.string().optional(),
  status: joi
    .string()
    .valid("Pending", "Approved", "Rejected")
    .default("Pending"),
});

export { loanRequestValidationSchema };
