import { sendUserResponse } from "../../../shared/helpers/index.js";
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  USER_DELETE_FAILED,
  USER_UPDATE_FAILED,
} from "../../../shared/constants/messages/users.js";
import { StatusCodes } from "../../../shared/constants/index.js";
import UserModel from "../models/index.js";
import chalk from "chalk";

export const createUser = (data) => {
  return new UserModel({ ...data })
    .save()
    .then((user) => (user ? user.toObject() : null))
    .catch((err) => {
      const response = sendUserResponse(
        StatusCodes.BAD_REQUEST,
        {},
        err.toString(),
        BAD_REQUEST
      );
      throw response;
    });
};

export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    const response = sendUserResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      true,
      SERVER_ERROR
    );
    throw response;
  }
};

export const getSingalUser = async (id) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    return user;
  } catch (error) {
    const response = sendUserResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      true,
      SERVER_ERROR
    );
    throw response;
  }
};

export const getUserById = (id) =>
  UserModel.findOne({ _id: id })
    .then((user) => (user ? user.toObject() : null))
    .catch((err) => {
      console.log("INDEX DB =>", err);
      throw err;
    });
export const getUserByEmail = (email) =>
  UserModel.findOne({ email })
    .then((user) => (user ? user.toObject() : null))
    .catch((err) => {
      console.log("ERROR IN DB =>", err);
      throw err;
    });

export const updateUserByEmail = async (email, data) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(email, data, {
      new: true,
      runValidators: true,
    });
    console.log("RESPONSE IN DB=>", updatedUser);
    return updatedUser;
  } catch (error) {
    console.log("ERROR IN DB =>", error);
    const response = sendUserResponse(
      StatusCodes.NOT_FOUND,
      null,
      JSON.stringify(error.message),
      USER_UPDATE_FAILED
    );
    throw response;
  }
};

export const updateUserById = async (id, data) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (error) {
    const response = sendUserResponse(
      StatusCodes.NOT_FOUND,
      null,
      JSON.stringify(error.message),
      NOT_FOUND,
      USER_UPDATE_FAILED
    );
    throw response;
  }
};
export const deleteUserById = async (id) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      const response = sendUserResponse(
        StatusCodes.NOT_FOUND,
        null,
        USER_DELETE_FAILED,
        NOT_FOUND
      );
      throw response;
    }
    return deletedUser;
  } catch (error) {
    const response = sendUserResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      JSON.stringify(error.message),
      USER_DELETE_FAILED
    );
    throw response;
  }
};
