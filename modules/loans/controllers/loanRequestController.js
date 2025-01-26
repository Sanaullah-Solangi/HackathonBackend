import chalk from "chalk";
import loanRequestService from "../services/loanRequestService.js";
const loanRequestController = async (req, res) => {
  try {
    const user = await loanRequestService(req.body);
    res.status(user.status).send(user);
  } catch (error) {
    res.status(error.status).send(error);
  }
};
export default loanRequestController;
