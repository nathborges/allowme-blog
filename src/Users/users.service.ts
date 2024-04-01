import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserType } from './interface/user.type';
import { faker } from '@faker-js/faker/locale/pt_BR';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(givenUser: UserType) {
    const user = this.usersRepository.create(givenUser);

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async deleteAll() {
    return await this.usersRepository.delete({});
  }

  async deleteById(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return result;
  }

  // @TODO: create a module specific for seeder
  async seeder() {
    const users: UserType[] = [];
    const numUsers = 10;
    for (let i = 0; i < numUsers; i++) {
      const full_name = faker.person.fullName();
      let username = full_name.toLowerCase().replace(/\s/g, '');
      // Removing punctuation
      username = username.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      users.push({ full_name, username });
    }

    try {
      await this.usersRepository.save(users);
      Logger.log(`${numUsers} users saved with success.`);
    } catch (error: unknown) {
      const errorTyped = error as Error;
      const errorMessage = errorTyped.message || 'Unknown error';

      Logger.error(`Failed to seed users: ${errorMessage}`);
      throw error;
    }
  }
}
