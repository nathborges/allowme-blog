import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UsersService } from 'src/Users/users.service';
import data from './seeder/data';
import { User } from 'src/Users/entity/user.entity';
import { getRandomNumber } from 'src/utils';
import { PostType } from './interface/post.type';

@Injectable()
export class PostsService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { username } = createPostDto;
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with ${username} not found`);
    }

    const post = this.postsRepository.create({ ...createPostDto, user });
    return await this.postsRepository.save(post);
  }

  async findAll() {
    return await this.postsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({ where: { id } });
  }

  async findAllByUsers(usernames: string[]) {
    return await this.postsRepository.find({
      where: {
        user: {
          username: In(usernames),
        },
      },
      relations: ['user'],
    });
  }

  async findAllOrderedByDate(orderParameter: 'asc' | 'desc') {
    return await this.postsRepository.find({
      order: {
        created_date: orderParameter,
      },
      relations: ['user'],
    });
  }

  async findByTitle(orderParameter: 'asc' | 'desc') {
    return await this.postsRepository.find({
      order: {
        created_date: orderParameter,
      },
      relations: ['user'],
    });
  }

  async deleteAll() {
    return await this.postsRepository.delete({});
  }

  async deleteById(id: number) {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return result;
  }

  // @TODO: create a module specific for seeder
  async seeder() {
    const posts: PostType[] = [];
    const allUsers: User[] = await this.usersService.findAll();

    if (!allUsers) {
      Logger.error('It was not possible to seed new posts.');
    }

    for (let i = 0; i < data.length; i++) {
      // Getting random user
      const userIndex = getRandomNumber(allUsers.length);
      const user = allUsers[userIndex];

      const content = data[i];
      const body = content.body;
      const title = content.title;

      // Generating random created_date field -> this is a BIG gambiarra
      const fakeDate = new Date();
      fakeDate.setDate(fakeDate.getDate() + i);

      posts.push({ body, title, user, created_date: fakeDate });
    }

    try {
      await this.postsRepository.save(posts);
      Logger.log(`${posts.length} posts saved with success.`);
    } catch (error: unknown) {
      const errorTyped = error as Error;
      const errorMessage = errorTyped.message || 'Unknown error';

      Logger.error(`Failed to seed posts: ${errorMessage}`);
      throw error;
    }
  }
}
