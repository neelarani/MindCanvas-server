import { Router } from 'express';
import * as controller from './post.controller';
import * as validation from './post.validation';
import { validateRequest } from '@/app/middlewares';
const router = Router();

router.post(
  '/',
  validateRequest(validation.createPostSchema),
  controller.createPost
);

router.get('/all-post', controller.getAllPosts);

router.get('/:id', controller.getSinglePost);

router.patch(
  '/update/:id',
  validateRequest(validation.updatePostSchema),
  controller.updatePost
);

router.delete('/:id', controller.deletePost);

router.get('/stats', controller.getBlogStat);

export default router;
