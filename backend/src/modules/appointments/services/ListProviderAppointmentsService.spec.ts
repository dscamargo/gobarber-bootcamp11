import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointments from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointments;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointments(
      fakeAppointmentsRepository,
    );
  });
  it('should be able list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 2, 2, 10, 0, 0),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 2, 2, 12, 0, 0),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 2, 2, 14, 0, 0),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    const response = await listProviderAppointments.execute({
      day: 2,
      month: 3,
      provider_id: 'provider-id',
      year: 2020,
    });

    expect(response).toEqual([appointment1, appointment2, appointment3]);
  });
});
