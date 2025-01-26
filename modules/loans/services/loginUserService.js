import chalk from "chalk";
import { StatusCodes } from "../../../shared/constants/index.js";
import {
  USER_LOGIN_SUCCESS,
  INVALID_CREDENTIALS,
  USER_NOT_FOUND,
  PASSWORD_INCORRECT,
} from "../../../shared/constants/messages/users.js";
import { loginUserSchema } from "../schemas/uesrSchema.js";
import {
  varifyPassword,
  generateToken,
  sendUserResponse,
} from "../../../shared/helpers/index.js";
import { getUserByEmail, createUser } from "../db/index.js";
const loginUserService = async (data) => {
  try {
    let { value, error } = loginUserSchema.validate(data);
    console.log("VALUE =>", value);
    error = error?.details[0]?.message;
    console.log(
      chalk.bgMagenta.black("JOI ERROR IN LOGIN", JSON.stringify(error))
    );
    if (error) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        error,
        INVALID_CREDENTIALS
      );
      throw response;
    }

    const isUser = await getUserByEmail(value.email);
    console.log(
      chalk.bgMagenta.black("DB ERROR IN LOGIN", JSON.stringify(isUser))
    );
    if (!isUser) {
      const response = sendUserResponse(
        StatusCodes.NOT_FOUND,
        null,
        true,
        USER_NOT_FOUND
      );
      throw response;
    }

    const isPasswordValid = await varifyPassword(
      value.password,
      isUser.password
    );
    console.log(
      chalk.bgMagenta.black("BCRYPT ERROR IN LOGIN", isPasswordValid)
    );
    if (!isPasswordValid) {
      const response = sendUserResponse(
        StatusCodes.UNAUTHORIZED,
        null,
        true,
        PASSWORD_INCORRECT
      );
      throw response;
    }
    const token = generateToken(isUser);
    console.log(
      chalk.bgMagenta.black("JWT ERROR IN LOGIN", JSON.stringify(token))
    );
    const response = sendUserResponse(
      StatusCodes.OK,
      { ...isUser, token },
      error,
      USER_LOGIN_SUCCESS
    );
    return response;
  } catch (error) {
    console.log(chalk.bgRed.white("Error in Service:", JSON.stringify(error)));
    throw error;
  }
};
export default loginUserService;
