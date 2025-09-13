import { Router } from "express";
import * as controller from "./user.controller";
import * as validator from "./user.validation";
import { validateRequest } from "@/app/middlewares";

const router = Router();

router.post(
  "/",
  validateRequest(validator.UserCreateSchema),
  controller.createUser
);
router.get("/get-all-users", controller.getAllUsers);

export default router;
