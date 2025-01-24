import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ENV,
  StatusCodes,
  transporter,
  joi,
} from "../../shared/constants/index.js";
import {
  PASSWORD_RESET_REQUEST_FAILED,
  TOKEN_NOT_PROVIDED,
  USER_NOT_FOUND,
  USER_UNAUTHORIZED,
} from "../constants/messages/users.js";
import { getUserById } from "../../modules/users/db/index.js";
const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, Number(ENV.SALT_ROUND));
  return hash;
};
const varifyPassword = async (password, hashedPassword) => {
  const validation = await bcrypt.compare(password, hashedPassword);
  return validation;
};

const generateToken = (userData) => {
  var token = jwt.sign({ ...userData }, ENV.SECRET_KEY);
  return token;
};
const validateEmailByToken = (token) => {
  const decodedToken = jwt.verify(token, ENV.SECRET_KEY);
  return decodedToken;
};

const validateToken = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const bearerToken = req?.headers?.authorization;
      if (!bearerToken) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            sendUserResponse(
              StatusCodes.BAD_REQUEST,
              null,
              true,
              TOKEN_NOT_PROVIDED
            )
          );
      }

      const token = bearerToken.split(" ")[1];
      const decodedToken = jwt.verify(token, ENV.SECRET_KEY);
      if (!decodedToken) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            sendUserResponse(
              StatusCodes.UNAUTHORIZED,
              null,
              true,
              USER_UNAUTHORIZED
            )
          );
      }

      const user = await getUserById(decodedToken?._id);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            sendUserResponse(StatusCodes.NOT_FOUND, null, true, USER_NOT_FOUND)
          );
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied!" });
      }
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          sendUserResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            null,
            true,
            error.message
          )
        );
    }
  };
};

const sendUserResponse = (status, data = null, error = false, message) => {
  return { status, data, error, message };
};

const sendMailPromise = (receiver) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(receiver, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

const sendMailToUser = async (email, token) => {
  try {
    const receiver = {
      from: '"HiStore Support 👨‍💻" <learnforskills005@gmail.com>',
      to: email,
      subject: "HiStore Password Reset Request",
      text: "We received a request to reset your password. Click the link below to proceed.",
      html: `
        <p>Hello,</p>
        <p>We received a request to reset your password. If this was you, click the link below to reset your password:</p>
        https://hackathon-backend-olive.vercel.app//api/user/reset-password?token=${token}" 
        <p>If you did not request this, you can safely ignore this email. Your password will remain secure.</p>
        <p>Thank you,</p>
        <p><b>HiStore Team</b></p>
      `,
    };

    const response = await sendMailPromise(receiver);
    return response;
  } catch (error) {
    const response = sendUserResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error,
      true,
      PASSWORD_RESET_REQUEST_FAILED
    );
    throw response;
  }
};

const generateResetPasswordHTML = (nonce, email) => {
  const CSS = `
<style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          sans-serif;
      }

      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        padding: 20px;
      }

      .card {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      .logo-container {
        text-align: center;
        margin-bottom: 32px;
      }

      .logo {
        height: 40px;
        width: auto;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 24px;
        color: #333;
      }

      .email-text {
        margin-bottom: 24px;
        color: #666;
      }

      .form-group {
        margin-bottom: 24px;
        position: relative;
      }

      label {
        display: block;
        margin-bottom: 8px;
        color: #666;
        font-size: 14px;
      }

      .password-input {
        position: relative;
        display: flex;
        align-items: center;
      }

      input[type="password"],
      input[type="text"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.2s;
        appearance: none; /* Ensures consistent styles across browsers */
      }

      input[type="password"]:focus,
      input[type="text"]:focus {
        outline: none;
        border-color: #4a67e4;
      }

      .toggle-password {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
      }

      #updateBtn {
        background-color: #4a67e4;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        width: 100%;
        transition: background-color 0.2s;
      }

      button[type="submit"]:hover {
        background-color: #3b52b4;
      }

      @media (max-width: 480px) {
        .card {
          padding: 24px;
        }
      }
    </style>
    `;
  const SCRIPT = `
  import {joi} from "../../shared/constants/index.js";
  const passwordSchema = joi.object({
    password: joi
      .string()
      .required()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .messages({
        password:
          "Password must include at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.",
      }),
  });
  const password = document.querySelector("#password");
  const email = document.querySelector("#email").innerHTML;
  const updateBtn = document.querySelector("#updateBtn");
  document
    .querySelector(".toggle-password")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);

      // Icon toggle
      this.textContent = type === "password" ? "👁️" : "🙈";
    });

    const updatePassword = async () => {
      try {
        const pass = password.value;
        let { value, error } = passwordSchema.validate(pass);
        error = error?.details[0]?.message;
        console.log("JOI ERROR IN HELPER INDEX", error);
        if (error) {
          const response = sendUserResponse(
            400,
            null,
            error,
            "Invalid credentials. Please try again."
          );
          throw response;
        }
        console.log("Iam called");
        password.style.borderColor = "green";
        let response = await fetch(
          "hackathon-backend-olive.vercel.app/api/user/update-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: value, email }),
          }
        );

        if (response.ok) {
          response = await response.json(); //
          console.log("Password updated successfully!", response.data);
          window.location.href = response.data;
        } else {
          console.log("Error updating password.");
        }
        password.value = "";
      } catch (error) {
        throw error;
      }
    };
    document
      .querySelector("#resetPasswordForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        updatePassword();
      });
        `;
  const LOGO = `
         <div class="logo-container">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lightLogo-7ofpZr3UVxmJZgeMVSSu5V3uPtEzP1.png"
              alt="HiStore Logo"
              class="logo"
            />
          </div>
`;
  const HEADING = `
       <h1>Reset your password</h1>
      <p class="email-text">for <strong><i id="email">${email}</i></strong></p>
`;
  const FORM = `
         <form action="/submit-reset" method="POST" id="resetPasswordForm">
            <div class="form-group">
                <label for="password">New password</label>
                <div class="password-input">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        minlength="8"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    >
                    <button type="button" class="toggle-password" aria-label="Toggle password visibility">
                        👁️
                    </button>
                </div>
            </div>
            <button id="updateBtn"type="submit">SAVE</button>
        </form>
`;
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
   ${CSS}
</head>
<body>
    <div class="card">
        <div class="logo-container">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lightLogo-7ofpZr3UVxmJZgeMVSSu5V3uPtEzP1.png" alt="HiStore Logo" class="logo">
        </div>
       ${HEADING}
      ${FORM}
    </div>

    <script nonce=${nonce}>
      ${SCRIPT}
    </script>
</body>
</html>
    `;
};

export {
  hashPassword,
  varifyPassword,
  sendUserResponse,
  generateToken,
  validateToken,
  validateEmailByToken,
  sendMailToUser,
  generateResetPasswordHTML,
};
