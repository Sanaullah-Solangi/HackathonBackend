import chalk from "chalk";
import getUsersService from "../services/getUsersService.js";
const getUsersController = async (req, res) => {
  try {
    const users = await getUsersService();
    res.status(users.status).send(users);
  } catch (error) {
    res.status(error.status).send(error);
  }
};
export default getUsersController;
