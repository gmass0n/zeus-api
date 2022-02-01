import { Router } from "express";

import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
import { authHandler } from "./middlewares/authHandle";

const routes = Router();

const authController = new AuthController();
const userController = new UserController();

routes.post("/signin", authController.signIn);
routes.use(authHandler);
routes.get("/users/me", userController.show);

export { routes };
