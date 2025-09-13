import { Router } from 'express';
import * as module from '@/app/modules';

export default [
  {
    path: '/user',
    route: module.UserRoutes,
  },
  {
    path: '/post',
    route: module.PostRoutes,
  },
].reduce((router, module) => router.use(module.path, module.route), Router());
