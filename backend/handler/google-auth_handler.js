import { Request, Response, NextFunction } from "express";
import AuthGoogleController from "../../controller/auth-google-controller";

const authGoogleController = new AuthGoogleController();

export const getGoogleOAuthUrl = (req, res, next) => {
  try {
    const result = authGoogleController.getGoogleOAuthUrl();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { code, gtoken } = req.query;
  try {
    const result = await authGoogleController.signin(code, gtoken);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
