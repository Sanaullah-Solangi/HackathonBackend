import chalk from "chalk";

import {
  hashPassword,
  sendUserResponse,
} from "../../../shared/helpers/index.js";
import { StatusCodes, ENV } from "../../../shared/constants/index.js";
import {
  PASSWORD_NOT_PROVIDED,
  EMAIL_NOT_PROVIDED,
  USER_UPDATE_SUCCESS,
  INVALID_CREDENTIALS,
} from "../../../shared/constants/messages/users.js";
import { updateUserByEmail } from "../db/index.js";
import { passwordSchema } from "../schemas/uesrSchema.js";
const updatePasswordService = async (password, email) => {
  try {
    console.log(chalk.bgBlue.red("UPDATE PASS SERV EMAIL =>", email));
    console.log(chalk.bgBlue.red("UPDATE PASS SERV PASSWORD =>", password));
    if (!email) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        true,
        EMAIL_NOT_PROVIDED
      );
      console.log(
        chalk.bgBlue.red("UPDATE PASS EMAIL ERROR =>", JSON.stringify(response))
      );
      throw response;
    }
    if (!password) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        true,
        PASSWORD_NOT_PROVIDED
      );
      console.log(
        chalk.bgBlue.red(
          "UPDATE PASS PASSWORD ERROR =>",
          JSON.stringify(response)
        )
      );
      throw response;
    }
    let { value, error } = passwordSchema.validate({ password });
    error = error?.details[0]?.message;
    if (error) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        error,
        INVALID_CREDENTIALS
      );
      console.log(
        chalk.bgBlue.red("UPDATE PASS JOI ERROR =>", JSON.stringify(response))
      );

      throw response;
    }
    const hashedPassword = await hashPassword(password);
    const updatedUser = await updateUserByEmail(
      { email },
      { password: hashedPassword }
    );

    if (updatedUser) {
      const response = sendUserResponse(
        StatusCodes.OK,
        `https://${ENV.BASE_URL}/confirmation-page.html`,
        false,
        USER_UPDATE_SUCCESS
      );
      return response;
    }
    console.log(chalk.bgYellow.blue("UPDATE_PASS SERVICE", updatedUser));
  } catch (error) {
    console.log(chalk.bgYellow("UPDATE_PASS Error =>", JSON.stringify(error)));
    throw error;
  }
};
export default updatePasswordService;
