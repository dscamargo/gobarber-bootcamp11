import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '../../notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let createAppointment: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 1, 12, 0, 0).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 0, 1, 13, 0, 0),
      provider_id: '123',
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 1, 12, 0, 0).getTime();
    });

    const appointmentDate = new Date(2020, 0, 1, 13, 0, 0);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
      user_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the appointments on the past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 1, 12, 0, 0).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 0, 1, 11, 0, 0),
        provider_id: '123',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the appointments with same user and provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 1, 12, 0, 0).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 0, 1, 13, 0, 0),
        provider_id: 'user-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the appointments outside available schedule', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 1, 12, 0, 0).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 0, 2, 7, 0, 0),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
