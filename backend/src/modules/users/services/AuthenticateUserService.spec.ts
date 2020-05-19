import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'douglas@email.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    expect(
      authenticateUser.execute({
        email: 'douglas@email.com.br',
        password: '12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
