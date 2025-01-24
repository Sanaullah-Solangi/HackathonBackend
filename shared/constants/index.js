import "dotenv/config";
import express from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import nodemailer from "nodemailer";
const ENV = process.env || {};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: ENV.USER_EMAIL,
    pass: ENV.USER_PASSWORD,
  },
});
export { express, ENV, joi, StatusCodes, nodemailer, transporter };
