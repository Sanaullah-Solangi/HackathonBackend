import chalk from "chalk";
import crypto from "crypto";
import { StatusCodes, ENV } from "../../../shared/constants/index.js";

import { loanRequestValidationSchema } from "../schemas/LoanRequestSchema.js";

import { addLoanRequest } from "../db/index.js";
import { sendUserResponse } from "../../../shared/helpers/index.js";
const loanRequestService = async (data) => {
  try {
    let { value, error } = loanRequestValidationSchema.validate(data);
    error = error?.details[0]?.message;
    console.log(error);
    if (error) {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        null,
        error,
        `Loan request validation failed`
      );
      throw response;
    }
    console.log(
      chalk.green("Loan request successfully saved in the database!")
    );
    const request = await addLoanRequest({ ...value });
    // const isAlready = await getUserByEmail(value.email);
    // if (isAlready) {
    //   const response = sendUserResponse(
    //     StatusCodes.CONFLICT,
    //     isAlready,
    //     true,
    //     USER_ALREADY_EXISTS
    //   );
    //   throw response;
    // }
    // const mailRsponse = await sendMailToUser(
    //   value.email,
    //   password,
    //   ENV,
    //   "registerUser"
    // );

    return sendUserResponse(
      StatusCodes.OK,
      {},
      error,
      "Loan request submitted successfully."
    );
  } catch (error) {
    console.log(
      chalk.bgRed.white("Error in Loan Request Service:", JSON.stringify(error))
    );
    throw error;
  }
};
export default loanRequestService;
