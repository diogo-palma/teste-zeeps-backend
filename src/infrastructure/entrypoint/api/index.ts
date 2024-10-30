import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { ErrorHandling } from "../../../application/middleware/error-handling";
import apiResponse from "../../../application/middleware/api-response";
import accountRoutes from "../../routes/account";

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((error) => {
    ErrorHandling.execute(error, req, res, next);
  });
};

const createApi = () => {
  const api = express();

  api.use(cors({ origin: true }));
  api.use(bodyParser.json());
  api.use(apiResponse);

  api.use("/api/v1/teste", accountRoutes(asyncHandler));

  return api;
};

export default createApi;