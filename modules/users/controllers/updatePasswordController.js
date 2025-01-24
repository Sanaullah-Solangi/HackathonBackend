import chalk from "chalk";
import updatePasswordService from "../services/updatePasswordService.js";
const updatePasswordController = async (req, res) => {
  try {
    const { password, email } = req.body;
    const response = await updatePasswordService(password, email);
    console.log(
      chalk.bgBlue.red("UPDATE_PASS CONTRO RES =>", JSON.stringify(response))
    );
    res.status(200).send(response);

    console.log("After redirect");
  } catch (error) {
    console.log(
      chalk.bgBlue.red("UPDATE_PASS CONTRO ERR =>", JSON.stringify(error))
    );
    res.status(error.status).send(error);
  }
};
export default updatePasswordController;
