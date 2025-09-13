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

export default router;
