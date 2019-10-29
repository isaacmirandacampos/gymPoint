import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import SchemeController from './app/controllers/SchemeController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentController.store);

routes.post('/schemes', SchemeController.store);
routes.get('/schemes', SchemeController.index);
routes.put('/schemes/:SchemeId', SchemeController.update);
routes.delete('/schemes/:SchemeId', SchemeController.delete);

routes.put('/users', UserController.update);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:enrollmentId', EnrollmentController.update);
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete);

export default routes;
