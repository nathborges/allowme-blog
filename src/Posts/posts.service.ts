import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UsersService } from 'src/Users/users.service';

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
      throw new NotFoundException('User not found');
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
}
