// ✅ Authentication & Authorization Messages
const USER_ALREADY_EXISTS = "User already exists.";
const USER_NOT_FOUND = "User not found.";
const USER_UNAUTHORIZED = "User is unauthorized.";
const USER_LOGIN_SUCCESS = "User logged in successfully.";
const USER_LOGOUT_SUCCESS = "User logged out successfully.";
const USER_REGISTER_SUCCESS = "User registered successfully.";
const INVALID_CREDENTIALS = "Invalid email or password.";
const ACCOUNT_DISABLED = "User account is disabled. Please contact support.";
const ACCESS_DENIED = "Access denied. You do not have permission.";
// ✅ CRUD Operation Messages
const USER_FETCH_SUCCESS = "User data fetched successfully.";
const USER_UPDATE_SUCCESS = "User updated successfully.";
const USER_DELETE_SUCCESS = "User deleted successfully.";
const USER_CREATE_SUCCESS = "User created successfully.";
const USER_UPDATE_FAILED = "Failed to update user.";
const USER_DELETE_FAILED = "Failed to delete user.";
const USER_CREATE_FAILED = "Failed to create user.";
// ✅ General Error Messages
const SERVER_ERROR = "Internal server error. Please try again later.";
const BAD_REQUEST = "Bad request. Please check your input.";
const NOT_FOUND = "Requested resource not found.";
const OPERATION_FAILED = "Operation failed. Please try again.";
const OPERATION_SUCCESS = "Operation completed successfully.";
// ✅ Validation Messages
const REQUIRED_FIELDS_MISSING = "Please fill in all required fields.";
const INVALID_EMAIL_FORMAT = "Invalid email format.";
const INVALID_INPUT = "Invalid input data.";
const FIELD_TOO_SHORT = "Input is too short.";
const FIELD_TOO_LONG = "Input is too long.";
// ✅ Token Related Messages
const TOKEN_NOT_PROVIDED = "Please provide a token.";
const TOKEN_INVALID = "Invalid token. Please log in again.";
const TOKEN_EXPIRED = "Token has expired. Please log in again.";
const TOKEN_VERIFIED = "Token verified successfully.";
// ✅ Password Forgot / Reset Messages
const EMAIL_NOT_PROVIDED = "Email is required for password reset.";
const PASSWORD_NOT_PROVIDED = "Password is required to update password.";
const ID_NOT_PROVIDED = "Id is required to delete user.";
const INVALID_EMAIL = "The provided email is invalid.";
const PASSWORD_RESET_REQUEST_SUCCESS =
  "Password reset request successful. Please check your email.";
const PASSWORD_RESET_REQUEST_FAILED =
  "Failed to process password reset request. Please try again.";
const PASSWORD_RESET_LINK_INVALID = "The reset link is invalid or expired.";
const PASSWORD_RESET_LINK_EXPIRED =
  "Password reset link has expired. Please request a new one.";
const PASSWORD_RESET_EMAIL_SENT = "Password reset email sent successfully.";
const PASSWORD_RESET_EMAIL_FAILED =
  "Failed to send password reset email. Please try again.";
const RESET_PASSWORD_PAGE_SUCCESS = "Reset password page loaded successfully.";
const RESET_PASSWORD_PAGE_FAILURE =
  "Reset password link is invalid or has expired. Please request a new one.";

// ✅ Password & Security Messages
const PASSWORD_RESET_SUCCESS = "Password reset successfully.";
const PASSWORD_RESET_FAILED = "Failed to reset password.";
const PASSWORD_CHANGE_SUCCESS = "Password changed successfully.";
const PASSWORD_CHANGE_FAILED = "Failed to change password.";
const PASSWORD_INCORRECT = "Incorrect current password.";
const PASSWORD_WEAK =
  "Password is too weak. Please choose a stronger password.";

// ✅ Mongo DB Connection
const MONGO_DB_CONNECTION_SUCCESS =
  "Successfully connected to the MongoDB database.";
const MONGO_DB_CONNECTION_FAILED =
  "Failed to connect to the MongoDB database. Please check the connection string and try again.";
export {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  USER_UNAUTHORIZED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  INVALID_CREDENTIALS,
  ACCOUNT_DISABLED,
  ACCESS_DENIED,
  // ✅ CRUD Operation Messages
  USER_FETCH_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_DELETE_FAILED,
  USER_CREATE_FAILED,
  // ✅ General Error Messages
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  OPERATION_FAILED,
  OPERATION_SUCCESS,
  // ✅ Mongo DB Connection
  MONGO_DB_CONNECTION_SUCCESS,
  MONGO_DB_CONNECTION_FAILED,
  // ✅ Password Forgot / Reset Messages
  EMAIL_NOT_PROVIDED,
  PASSWORD_NOT_PROVIDED,
  ID_NOT_PROVIDED,
  INVALID_EMAIL,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_FAILED,
  PASSWORD_RESET_LINK_INVALID,
  PASSWORD_RESET_LINK_EXPIRED,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_EMAIL_FAILED,
  // ✅ Password & Security Messages
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILED,
  PASSWORD_INCORRECT,
  PASSWORD_WEAK,
  RESET_PASSWORD_PAGE_SUCCESS,
  RESET_PASSWORD_PAGE_FAILURE,
  // ✅ Validation Messages
  REQUIRED_FIELDS_MISSING,
  INVALID_EMAIL_FORMAT,
  INVALID_INPUT,
  FIELD_TOO_SHORT,
  FIELD_TOO_LONG,
  // ✅ Token Related Messages
  TOKEN_NOT_PROVIDED,
  TOKEN_INVALID,
  TOKEN_EXPIRED,
  TOKEN_VERIFIED,
};
