import chalk from "chalk";
import {
  hashPassword,
  sendUserResponse,
} from "../../../shared/helpers/index.js";
import { StatusCodes } from "../../../shared/constants/index.js";
import { USER_UPDATE_SUCCESS } from "../../../shared/constants/messages/users.js";
import { updateUserByEmail } from "../db/index.js";
const updatePasswordService = async (password, email) => {
  try {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await updateUserByEmail(
      { email },
      { password: hashedPassword }
    );
    if (updatedUser) {
      const response = sendUserResponse(
        StatusCodes.OK,
        "hackathon-backend-olive.vercel.app/confirmation-page.html",
        false,
        USER_UPDATE_SUCCESS
      );
      return response;
    }
    console.log(chalk.bgYellow.blue("UPDATE_PASS SERVICE", password, email));
  } catch (error) {
    console.log(chalk.bgYellow("UPDATE_PASS Error =>", error));
    throw error;
  }
};
export default updatePasswordService;
