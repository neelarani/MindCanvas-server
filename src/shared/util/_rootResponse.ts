import { HTTP_CODE } from "../constants";
import { catchAsync } from "./_catchAsync";
import { sendResponse } from "../common/_sendResponse";

export const rootResponse = catchAsync(async (_, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: "Welcome to Neela Wallet API",
  });
});
