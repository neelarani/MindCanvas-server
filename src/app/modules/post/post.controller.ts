import { catchAsync, HTTP_CODE, sendResponse } from '@/shared';
import * as service from './post.service';

export const createPost = catchAsync(async (req, res) => {
  const result = await service.createPost(req.body);
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Post created!',
    data: result,
  });
});
