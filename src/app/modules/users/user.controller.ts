import { catchAsync, HTTP_CODE, sendResponse } from "@/shared";
import * as service from "./user.service";

export const createUser = catchAsync(async (req, res) => {
  const result = await service.createUser(req.body);
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: "User created!",
    data: result,
  });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const result = await service.getAllUsers();
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: "Retrieved all users successfully!",
    data: result,
  });
});
