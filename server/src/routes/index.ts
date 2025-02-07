import { Router } from 'express';
import seminarRoutes from './seminar.routes';
const router = Router();

router.use('/seminars', seminarRoutes);

export default router;
