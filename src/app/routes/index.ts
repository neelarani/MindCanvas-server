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
  {
    path: '/auth',
    route: module.AuthRoutes,
  },
].reduce((router, module) => router.use(module.path, module.route), Router());
