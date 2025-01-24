import chalk from "chalk";
import { StatusCodes } from "../../../shared/constants/index.js";
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
    const hashedPassword = await hashPassword(value.password);
    value.password = hashedPassword;
    const newUser = await createUser(value);
    const token = generateToken(newUser);
    return sendUserResponse(
      StatusCodes.CREATED,
      { ...newUser, token },
      error,
      USER_REGISTER_SUCCESS
    );
  } catch (error) {
    console.log(chalk.bgRed.white("Error in Service:", error));
    throw error;
  }
};
export default createUserService;
