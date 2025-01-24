import chalk from "chalk";
import createUserService from "../services/registerUserService.js";
const registerUserController = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.status(user.status).send(user);
  } catch (error) {
    res.status(error.status).send(error);
  }
};
export default registerUserController;
