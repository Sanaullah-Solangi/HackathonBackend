import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
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
    const currentLocation = fileURLToPath(import.meta.url);
    const rootPath = dirname(join(currentLocation, "../../..")); // Root folder tak path
    const publicFolder = join(rootPath, "public"); // Public folder path
    const confirmationPagePath = join(publicFolder, "confirmation-page.html"); // Final file path

    console.log("CURRENT LOCATION =>", currentLocation);
    console.log("PUBLIC FOLDER =>", publicFolder);
    console.log("CONFIRMATION PAGE =>", confirmationPagePath);
    if (updatedUser) {
      const response = sendUserResponse(
        StatusCodes.OK,
        "http://localhost:4002/confirmation-page.html",
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
