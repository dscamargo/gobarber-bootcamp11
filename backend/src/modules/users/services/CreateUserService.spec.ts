import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'douglas@email.com.br',
      name: 'Douglas',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Douglas');
  });

  it('should not be able to create two users using same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
