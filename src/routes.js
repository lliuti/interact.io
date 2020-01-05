import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import SessionController from './app/controllers/SessionController';
import CommentController from './app/controllers/CommentController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = new Router();

/* USERS */
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

/* CREATE SESSION */
routes.post('/auth', SessionController.store);

/* SIGNED IN VERIFICATION */
routes.use(AuthMiddleware);

/* POSTS */
routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);

/* COMMENTS */
routes.get('/posts/:post_id/comments', CommentController.index);
routes.post('/posts/:post_id/comments', CommentController.store);

export default routes; 