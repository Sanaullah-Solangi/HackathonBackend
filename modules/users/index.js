import chalk from "chalk";
import { express } from "../../shared/constants/index.js";
import forgotPasswordController from "./controllers/forgotPasswordController.js";
import getUsersController from "./controllers/getUsersController.js";
import loginUserController from "./controllers/loginUserController.js";
import updateProfileController from "./controllers/updateProfileController.js";
import registerUserController from "./controllers/registerUserController.js";
import resetPasswordController from "./controllers/resetPasswordController.js";
import updatePasswordController from "./controllers/updatePasswordController.js";
import deleteUserController from "./controllers/deleteUserController.js";
import getUserController from "./controllers/getUserController.js";
import { validateToken } from "../../shared/helpers/index.js";
import confirmationPageController from "./controllers/confirmationPageController.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Users Page Is Preset");
  console.log(chalk.bgCyan("Users Page Is Preset"));
});
router.post("/forgot-password", forgotPasswordController);
router.get("/get-users", validateToken(["admin"]), getUsersController);
router.get("/get-user", validateToken(["admin"]), getUserController);
router.post("/login-user", loginUserController);
router.put(
  "/update-profile",
  validateToken(["admin", "user"]),
  updateProfileController
);
router.post("/register-user", registerUserController);
router.get("/reset-password", resetPasswordController);
router.post("/update-password", updatePasswordController);
router.post("/delete-user", validateToken(["admin"]), deleteUserController);
router.get("/confirmation-page", confirmationPageController);
export default router;
