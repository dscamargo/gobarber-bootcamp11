import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentController = new AppointmentController();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
