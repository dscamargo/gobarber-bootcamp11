import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProvidersDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able list the Day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 15, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 16, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 1, 11, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      day: 1,
      month: 1,
      provider_id: '123',
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 15, available: false },
        { hour: 16, available: false },
      ]),
    );
  });
});
