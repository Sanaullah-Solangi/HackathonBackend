import chalk from "chalk";
import updateProfileService from "../services/updateProfileService.js";
const updateProfileController = async (req, res) => {
  try {
    const response = await updateProfileService(req.body);
    res.send(response);
    // res.status(user.status).send(user);
    console.log(chalk.bgYellow.red("updateProfileController"));
  } catch (error) {
    console.log(chalk.bgYellow.red("Profile Controller Error =>", error));
    res.status(error.status).send(error);
  }
};
export default updateProfileController;
