import chalk from "chalk";
import { getSingalUser } from "../db/index.js";
import { sendUserResponse } from "../../../shared/helpers/index.js";
import { StatusCodes } from "../../../shared/constants/index.js";
import { USER_FETCH_SUCCESS } from "../../../shared/constants/messages/users.js";
const getUserService = async (id) => {
  try {
    const user = await getSingalUser(id);
    const response = sendUserResponse(
      StatusCodes.OK,
      user,
      false,
      USER_FETCH_SUCCESS
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export default getUserService;
