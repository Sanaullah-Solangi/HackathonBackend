import chalk from "chalk";
import createUserService from "../services/registerUserService.js";
const registerUserController = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    console.log("RESPONSE OF REGISTERATION =>", JSON.stringify(user));
    res.status(user.status).send(user);
  } catch (error) {
    console.log("ERROR IN REGISTERATION =>", JSON.stringify(error));
    res.status(error.status).send(error);
  }
};
export default registerUserController;
