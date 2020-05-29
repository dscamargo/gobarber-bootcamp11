import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 8, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 9, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 10, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 11, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 12, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 13, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 14, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
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
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 1, 17, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 0, 2, 8, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });

    const availability = await listProviderMonthAvailability.execute({
      month: 1,
      year: 2020,
      provider_id: '123',
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
        { day: 3, available: true },
        { day: 4, available: true },
      ]),
    );
  });
});
