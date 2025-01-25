import { ENV, express } from "./shared/constants/index.js";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import chalk from "chalk";
import routes from "./router/index.js";
import {
  MONGO_DB_CONNECTION_FAILED,
  MONGO_DB_CONNECTION_SUCCESS,
} from "./shared/constants/messages/users.js";
const app = express();
const PORT = ENV.PORT;
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": [
          "'self'",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com",
        ],
        "font-src": [
          "'self'",
          "https://fonts.gstatic.com", // Font files
        ],
        // Add more directives if needed
      },
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(ENV.MONGODB_URI)
  .then(() => {
    console.log(chalk.white.bgGreen(MONGO_DB_CONNECTION_SUCCESS));
  })
  .catch(() => {
    console.log(chalk.bgRed(MONGO_DB_CONNECTION_FAILED));
  });
app.get("/", (req, res) => {
  console.log(`Request URL: ${req.url}`);
  res.send("Main Page is called");
});
app.use("/api", routes);
app.listen(PORT, () =>
  console.log(chalk.bgBlue(`App is running on => ${PORT} PORT`))
);
