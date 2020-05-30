import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  private usersRepository: IUserRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUserRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
