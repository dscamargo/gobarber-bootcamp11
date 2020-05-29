import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersDayAvailabilityService from '@modules/appointments/services/ListProvidersDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const listProvidersDayAvailabilityService = container.resolve(
      ListProvidersDayAvailabilityService,
    );

    const providers = await listProvidersDayAvailabilityService.execute({
      day,
      month,
      provider_id,
      year,
    });

    return response.json(providers);
  }
}
