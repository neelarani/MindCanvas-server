import { catchAsync, HTTP_CODE, sendResponse } from '@/shared';

import * as service from './auth.service';

export const loginWithEmailAndPassword = catchAsync(async (req, res) => {
  const result = await service.loginWithEmailAndPassword(req.body);
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'User login successfully!',
    data: result,
  });
});

export const authWithGoogle = catchAsync(async (req, res) => {
  const result = await service.authWithGoogle(req.body);
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'User login successfully!',
    data: result,
  });
});
