import chalk from "chalk";
import forgotPasswordService from "../services/forgotPasswordService.js";
const forgotPasswordController = async (req, res) => {
  try {
    console.log(chalk.bgBlue.red("FORGOT EMAIL =>", req.body.email));
    const response = await forgotPasswordService(req.body.email);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Error Forget =>", error);
    res.status(error.status).send(error);
  }
};
export default forgotPasswordController;
