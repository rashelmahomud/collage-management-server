import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
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
  {
    path: '/faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/department',
    route: AcademicDepartmentRoute,
  },
];

modulesRoute.forEach(route => router.use(route.path, route.route));

// router.use('/user', UserRoute);
// router.use('/semester', SemesterRoute);

export default router;
