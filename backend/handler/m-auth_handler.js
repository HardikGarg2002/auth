import * as m_authController from "../controllers/m-auth_controller.js";

export async function signup(req, res, next) {
  try {
    const { mobile, password } = req.body;
    console.log(mobile, password);
    const userId = await m_authController.signup(mobile, password);
    res.status(201).json({ message: "user created successfully", id: userId });
  } catch (err) {
    next(err);
  }
}
