import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepositoryInterface from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UserRepository implements IUsersRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[] = [];
    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
        select: ['id', 'name', 'email', 'avatar', 'created_at', 'updated_at'],
      });
    } else {
      users = await this.ormRepository.find({
        select: ['id', 'name', 'email', 'avatar', 'created_at', 'updated_at'],
      });
    }

    return users;
  }
}

export default UserRepository;
