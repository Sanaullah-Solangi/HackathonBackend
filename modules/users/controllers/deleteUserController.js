import chalk from "chalk";
import deleteUserService from "../services/deleteUserService.js";
const deleteUserController = async (req, res) => {
  try {
    console.log(chalk.bgBlue.red("DELETE USER ID =>", req.body.id));
    const response = await deleteUserService(req.body.id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Error DELETED USER =>", error);
    res.status(error.status).send(error);
  }
};
export default deleteUserController;
