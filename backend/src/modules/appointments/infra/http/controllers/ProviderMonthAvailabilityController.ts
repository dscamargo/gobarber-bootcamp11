import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;

    const listProvidersMonthAvailabilityService = container.resolve(
      ListProvidersMonthAvailabilityService,
    );

    const providers = await listProvidersMonthAvailabilityService.execute({
      month,
      provider_id,
      year,
    });

    return response.json(providers);
  }
}
