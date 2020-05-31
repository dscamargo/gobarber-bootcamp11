import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    await createUser.execute({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'douglas@email.com.br',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'douglas@email.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'douglas@email.com.br',
        password: '12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
