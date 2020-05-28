import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    const myUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(myUser.name).toBe('Douglas');
    expect(myUser.email).toBe('douglas@email.com.br');
  });

  it('should not be able to show the profile if user not found', async () => {
    await expect(
      showProfile.execute({
        user_id: 'any-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
