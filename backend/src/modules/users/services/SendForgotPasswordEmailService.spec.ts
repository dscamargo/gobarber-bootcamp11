import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendoForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'douglas@email.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password when user not found', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'douglas@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await fakeUsersRepository.create({
      name: 'Douglas',
      email: 'douglas@email.com.br',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'douglas@email.com.br',
    });

    expect(generateToken).toHaveBeenCalled();
  });
});
