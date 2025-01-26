import chalk from "chalk";
import { StatusCodes } from "../../../shared/constants/index.js";
import { getUserById, deleteUserById } from "../db/index.js";
import {
  PASSWORD_RESET_REQUEST_SUCCESS,
  ID_NOT_PROVIDED,
  USER_NOT_FOUND,
  USER_DELETE_SUCCESS,
} from "../../../shared/constants/messages/users.js";
import { sendUserResponse } from "../../../shared/helpers/index.js";
const deleteUserService = async (id) => {
  try {
    console.log(chalk.bgBlue.red("DELETE SERV ID =>", id));
    if (!id) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        true,
        ID_NOT_PROVIDED
      );
      console.log(chalk.bgBlue.red("DELETE EMAIL ERROR =>", response));

      throw response;
    }

    const isUser = await getUserById(id);
    if (!isUser) {
      const response = sendUserResponse(
        StatusCodes.NOT_FOUND,
        null,
        true,
        USER_NOT_FOUND
      );
      console.log(chalk.bgBlue.red("DELETE DB ERROR =>", response));

      throw response;
    }
    const deletedUser = await deleteUserById(id);
    const response = sendUserResponse(
      StatusCodes.OK,
      deletedUser,
      false,
      USER_DELETE_SUCCESS
    );
    console.log(chalk.bgBlue.red("DELETE MAIL RESPONSE =>", response));

    return response;
  } catch (error) {
    console.log(chalk.bgBlue.red("DELETE CATCH ERROR =>", error));
    throw error;
  }
};
export default deleteUserService;
