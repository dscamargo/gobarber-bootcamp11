import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListAllProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listAllProviders: ListAllProvidersService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listAllProviders = new ListAllProvidersService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@email.com.br',
      password: '123123',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'Usuario 02',
      email: 'usuario02@email.com.br',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Usuario 03',
      email: 'usuario03@email.com.br',
      password: '123123',
    });

    const providers = await listAllProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });
});
