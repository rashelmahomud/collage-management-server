import express from 'express';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { UserRoute } from '../modules/user/users.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/semester',
    route: SemesterRoute,
  },
];

modulesRoute.forEach(route => router.use(route.path, route.route));

// router.use('/user', UserRoute);
// router.use('/semester', SemesterRoute);

export default router;
