import chalk from "chalk";
import { getUsers } from "../db/index.js";
import { sendUserResponse } from "../../../shared/helpers/index.js";
import { StatusCodes } from "../../../shared/constants/index.js";
import { USER_FETCH_SUCCESS } from "../../../shared/constants/messages/users.js";
const getUsersService = async () => {
  try {
    const users = await getUsers();
    const response = sendUserResponse(
      StatusCodes.OK,
      users,
      false,
      USER_FETCH_SUCCESS
    );
    response.total = users.length;
    return response;
  } catch (error) {
    throw error;
  }
};
export default getUsersService;
