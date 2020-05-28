import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Douglas editado',
      email: 'douglas@editado.com.br',
    });

    expect(updatedUser?.email).toBe('douglas@editado.com.br');
    expect(updatedUser?.name).toBe('Douglas editado');
  });

  it('should be able to change the email if email is already used for another user', async () => {
    const firstUser = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas2@email.com.br',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: firstUser.id,
        name: 'Douglas editado',
        email: 'douglas2@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '111111',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Douglas editado',
      email: 'douglas@editado.com.br',
      password: '123123',
      old_password: '111111',
    });

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '111111',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Douglas editado',
        email: 'douglas@editado.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a incorrect old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '111111',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Douglas editado',
        email: 'douglas@editado.com.br',
        password: '123123',
        old_password: '222222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'any-non-existing-user-id',
        name: 'Douglas editado',
        email: 'douglas@editado.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
