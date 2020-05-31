import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'douglas@email.com.br',
      name: 'Douglas',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Douglas');
  });

  it('should not be able to create two users using same email', async () => {
    await createUser.execute({
      email: 'douglas@email.com.br',
      name: 'Douglas',
      password: '123123',
    });

    await expect(
      createUser.execute({
        email: 'douglas@email.com.br',
        name: 'Douglas',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
