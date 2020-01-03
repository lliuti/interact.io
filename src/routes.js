import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = new Router();

/* USERS */
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

/* SESSION */
routes.post('/auth', SessionController.store);

/* SIGNED IN VERIFICATION */
routes.use(AuthMiddleware);

/* POSTS */
routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);

export default routes;