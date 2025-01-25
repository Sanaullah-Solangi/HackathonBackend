import chalk from "chalk";
import {
  generateResetPasswordHTML,
  sendUserResponse,
  validateEmailByToken,
} from "../../../shared/helpers/index.js";
import { StatusCodes, ENV } from "../../../shared/constants/index.js";
import {
  RESET_PASSWORD_PAGE_SUCCESS,
  INVALID_CREDENTIALS,
  USER_NOT_FOUND,
} from "../../../shared/constants/messages/users.js";
import { getUserByEmail } from "../db/index.js";
import { emailSchema } from "../schemas/uesrSchema.js";
const resetPasswordService = async (token, nonce) => {
  try {
    const { email } = validateEmailByToken(token);
    let { value, error } = emailSchema.validate({ email });
    console.log("EMAIL IN SERVICE VALUE =>", value);

    error = error?.details[0]?.message;
    if (error) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        error,
        INVALID_CREDENTIALS
      );

      console.log(chalk.bgBlue.red("RESET JOI ERR =>", error));
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
      console.log(
        chalk.bgBlue.red("RESET DB ERR =>", JSON.stringify(response))
      );

      throw response;
    }
    const html = generateResetPasswordHTML(nonce, email, ENV);
    const response = sendUserResponse(
      StatusCodes.OK,
      html,
      false,
      RESET_PASSWORD_PAGE_SUCCESS
    );
    return response;
  } catch (err) {
    console.log(
      chalk.bgGray.black("RESET SERVICE ERR =>", JSON.stringify(err))
    );

    throw err;
  }
};
export default resetPasswordService;
