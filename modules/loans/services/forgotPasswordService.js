import chalk from "chalk";
import { StatusCodes, ENV } from "../../../shared/constants/index.js";
import { getUserByEmail } from "../db/index.js";
import {
  PASSWORD_RESET_REQUEST_SUCCESS,
  EMAIL_NOT_PROVIDED,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
} from "../../../shared/constants/messages/users.js";
import {
  generateToken,
  sendMailToUser,
  sendUserResponse,
} from "../../../shared/helpers/index.js";
import { emailSchema } from "../schemas/uesrSchema.js";
const forgotPasswordService = async (email) => {
  try {
    console.log(chalk.bgBlue.red("FORGOT SERV EMAIL =>", email));
    if (!email) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        true,
        EMAIL_NOT_PROVIDED
      );
      console.log(chalk.bgBlue.red("FORGOT EMAIL ERROR =>", response));

      throw response;
    }
    let { value, error } = emailSchema.validate({ email });
    error = error?.details[0]?.message;
    if (error) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        error,
        INVALID_CREDENTIALS
      );
      console.log(
        chalk.bgBlue.red("FORGOT JOI ERROR =>", JSON.stringify(response))
      );

      throw response;
    }
    const isUser = await getUserByEmail(email);
    if (!isUser) {
      const response = sendUserResponse(
        StatusCodes.NOT_FOUND,
        null,
        true,
        USER_NOT_FOUND
      );
      console.log(chalk.bgBlue.red("FORGOT DB ERROR =>", response));

      throw response;
    }
    const token = generateToken({ email });

    const mailRsponse = await sendMailToUser(
      email,
      token,
      ENV,
      "updatePassword"
    );
    const response = sendUserResponse(
      StatusCodes.OK,
      null,
      false,
      PASSWORD_RESET_REQUEST_SUCCESS
    );
    console.log(chalk.bgBlue.red("FORGOT MAIL RESPONSE =>", response));

    return response;
  } catch (error) {
    console.log(chalk.bgBlue.red("FORGOT CATCH ERROR =>", error));
    throw error;
  }
};
export default forgotPasswordService;
