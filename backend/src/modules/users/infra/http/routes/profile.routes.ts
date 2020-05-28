import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController();

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.put('/', profileController.update);
usersRouter.get('/', profileController.show);

export default usersRouter;
