import chalk from "chalk";
import { sendUserResponse } from "../../../shared/helpers/index.js";
import { StatusCodes } from "../../../shared/constants/index.js";
import { USER_UPDATE_SUCCESS } from "../../../shared/constants/messages/users.js";
import { updateUserById } from "../db/index.js";
const updateProfileService = async (userData) => {
  try {
    const { id, data } = userData;
    const updatedUser = await updateUserById(id, data);
    const response = sendUserResponse(
      StatusCodes.OK,
      updatedUser,
      false,
      USER_UPDATE_SUCCESS
    );
    console.log(chalk.bgYellow.blue("update Service Data", response));
    return response;
  } catch (error) {
    console.log(chalk.bgYellow("Profile Service Error =>", error));
    throw error;
  }
};
export default updateProfileService;
