import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import NotificationController from './app/controllers/NotificationController';
import CheckinsController from './app/controllers/CheckinsController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/register', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/students/:studentId', StudentController.index);

routes.use(authMiddleware);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:studentId', StudentController.update);
routes.delete('/students/:studentId', StudentController.delete);

routes.get('/students/:student_id/checkins', CheckinsController.index);
routes.post('/students/:student_id/checkins', CheckinsController.store);

routes.get('/students/help-orders/all', HelpOrdersController.index);
routes.post('/students/:student_id/help-orders', HelpOrdersController.store);
routes.put(
  '/students/help-orders/:id_answer/answer',
  HelpOrdersController.update
);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:planId', PlanController.index);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

routes.put('/users', UserController.update);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:enrollmentId', EnrollmentController.index);
routes.put('/enrollments/:enrollmentId', EnrollmentController.update);
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
