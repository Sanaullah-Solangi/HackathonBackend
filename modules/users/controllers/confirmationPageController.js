import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const confirmationPageController = async (req, res) => {
  try {
    const currentLocation = fileURLToPath(import.meta.url);
    const currentPath = dirname(currentLocation);
    const rootPath = join(currentPath, "../../../");
    const confirmationPagePath = join(rootPath, "public", "confirmation-page.html");

    res.sendFile(confirmationPagePath);
  } catch (error) {
    console.log("Error DELETED USER =>", error);
    res.send(error);
  }
};
export default confirmationPageController;
