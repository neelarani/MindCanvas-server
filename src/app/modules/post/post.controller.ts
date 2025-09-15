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

export const getAllPosts = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = (req.query.search as string) || '';
  const isFeatured = req.query.isFeatured
    ? req.body.isFeatured === 'true'
    : undefined;
  const tags = req.query.tags ? (req.query.tags as string).split(',') : [];
  const orderBy = (req.query.orderBy as 'asc' | 'desc') || 'asc';
  const result = await service.getAllPosts({
    page,
    limit,
    search,
    isFeatured,
    tags,
    orderBy,
  });
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Retrieved all posts',
    data: result,
  });
});

export const getSinglePost = catchAsync(async (req, res) => {
  const result = await service.getSinglePost(Number(req.params.id));
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Post retrieved successfully!',
    data: result,
  });
});

export const updatePost = catchAsync(async (req, res) => {
  const result = await service.updatePost(Number(req.params.id), req.body);
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Post updated successfully!',
    data: result,
  });
});

export const deletePost = catchAsync(async (req, res) => {
  const result = await service.deletePost(Number(req.params.id));
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Post deleted successfully!',
    data: result,
  });
});
