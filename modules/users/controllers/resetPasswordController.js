import chalk from "chalk";
import crypto from "crypto";
import resetPasswordService from "../services/resetPasswordService.js";
const resetPasswordController = async (req, res) => {
  try {
    const nonce = crypto.randomBytes(16).toString("base64");
    res.setHeader(
      "Content-Security-Policy",
      `script-src 'self' 'nonce-${nonce}'`
    );
    const response = await resetPasswordService(req.query.token, nonce);
    console.log(chalk.bgBlue.red("RESET CONTRO RES =>", response));
    res.send(response.data);
  } catch (error) {
    console.log(chalk.bgBlue.red("RESET CONTRO ERR =>", JSON.stringify(error)));
    res.status(404).send(error);
  }
};
export default resetPasswordController;
