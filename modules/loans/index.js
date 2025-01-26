import chalk from "chalk";
import { express } from "../../shared/constants/index.js";
import { validateToken } from "../../shared/helpers/index.js";
import loanRequestController from "./controllers/loanRequestController.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Loans Page Is Preset");
  console.log(chalk.bgCyan("Loans Page Is Preset"));
});
// router.get(
//   "/get-loanrequests",
//   validateToken(["admin"]),
//   getLoanRequestsController
// );
// router.get(
//   "/get-loanrequest",
//   validateToken(["admin"]),
//   getLoanRequestController
// );
// router.post(
//   "/delete-loanrequest",
//   validateToken(["admin"]),
//   deleteLoanRequestController
// );
router.post("/loanrequest", loanRequestController);
// router.put(
//   "/update-loanrequest",
//   validateToken(["admin"]),
//   updateLoanRequestController
// );
export default router;
