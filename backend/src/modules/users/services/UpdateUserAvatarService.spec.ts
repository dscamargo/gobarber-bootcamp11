import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to update a user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    await updateUserAvatar.execute({
      avatar_filename: 'avatar.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar of a non authenticated user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        avatar_filename: 'avatar.png',
        user_id: 'id-not-founded',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete a old avatar and save a new avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    await updateUserAvatar.execute({
      avatar_filename: 'avatar.png',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatar_filename: 'avatar2.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
