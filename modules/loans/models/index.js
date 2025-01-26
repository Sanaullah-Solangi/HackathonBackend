import mongoose, { Schema } from "mongoose";

const loanRequestSchema = new Schema({
  // loan Schema
  loanCategory: {
    type: String,
    required: [true, "Loan category is required"],
    enum: ["Wedding", "Home Construction", "Business Startup", "Education"],
  },
  loanSubcategory: {
    type: String,
    required: [true, "Loan subcategory is required"],
  },
  loanAmount: {
    type: Number,
    required: [true, "Loan amount is required"],
    min: [10000, "Loan amount should be at least 10,000 PKR"],
    max: [1000000, "Loan amount should not exceed 1,000,000 PKR"],
  },
  // Guarantor Schema
  name: {
    type: String,
    required: [true, "Guarantor name is required"],
  },
  email: {
    type: String,
    required: [true, "Guarantor email is required"],
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  cnic: {
    type: String,
    required: [true, "Guarantor CNIC is required"],
    match: [/^\d{13}$/, "CNIC must be 13 digits"],
  },
  // Personal Schema
  name: {
    type: String,
    required: [true, "Personal name is required"],
  },
  email: {
    type: String,
    required: [true, "Personal email is required"],
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  cnic: {
    type: String,
    required: [true, "Personal CNIC is required"],
    match: [/^\d{13}$/, "CNIC must be 13 digits"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

const LoanRequestModel =
  mongoose.models.LoanRequest ||
  mongoose.model("LoanRequest", loanRequestSchema);
export default LoanRequestModel;
