import getUserService from "../services/getUserService.js";
const getUserController = async (req, res) => {
  try {
    console.log(req.route.path);
    const users = await getUserService(req.body.id);
    res.status(users.status).send(users);
  } catch (error) {
    res.status(error.status).send(error);
  }
};
export default getUserController;
