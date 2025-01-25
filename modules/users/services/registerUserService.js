import chalk from "chalk";
import crypto from "crypto";
import { StatusCodes, ENV } from "../../../shared/constants/index.js";
import {
  USER_REGISTER_SUCCESS,
  INVALID_CREDENTIALS,
  USER_ALREADY_EXISTS,
} from "../../../shared/constants/messages/users.js";
import { registerUserSchema } from "../schemas/uesrSchema.js";
import {
  hashPassword,
  generateToken,
  sendUserResponse,
  sendMailToUser,
} from "../../../shared/helpers/index.js";
import { getUserByEmail, createUser } from "../db/index.js";
const createUserService = async (data) => {
  try {
    let { value, error } = registerUserSchema.validate(data);
    error = error?.details[0]?.message;
    console.log(error);
    if (error) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        error,
        INVALID_CREDENTIALS
      );
      throw response;
    }

    const isAlready = await getUserByEmail(value.email);
    if (isAlready) {
      const response = sendUserResponse(
        StatusCodes.CONFLICT,
        isAlready,
        true,
        USER_ALREADY_EXISTS
      );
      throw response;
    }
    let password = crypto.randomBytes(16).toString("base64");
    const mailRsponse = await sendMailToUser(
      value.email,
      password,
      ENV,
      "registerUser"
    );
    const hashedPassword = await hashPassword(password);
    password = hashedPassword;
    console.log("PASSWORD =>", password);
    const newUser = await createUser({ ...value, password });

    return sendUserResponse(
      StatusCodes.CREATED,
      { ...newUser },
      error,
      USER_REGISTER_SUCCESS
    );
  } catch (error) {
    console.log(chalk.bgRed.white("Error in Service:", error));
    throw error;
  }
};
export default createUserService;
