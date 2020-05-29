import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProvidersMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersController = new ProvidersController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providersMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providersDayAvailabilityController.index,
);

export default providersRouter;
