import chalk from "chalk";
import loginUserService from "../services/loginUserService.js";
const loginUserController = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    res.status(user.status).send(user);
  } catch (error) {
    console.log(chalk.bgRed("ALL USERS", error));

    res.status(error.status).send(error);
  }
};
export default loginUserController;
