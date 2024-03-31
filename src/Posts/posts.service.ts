import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({ where: { id } });
  }

  // async update(id: number, updateCityDto: UpdateCityDto) {
  //   const post = await this.findOne(id);
  //   if (!post) {
  //     throw new NotFoundException();
  //   }

  //   Object.assign(post, updateCityDto);

  //   return await this.postsRepository.save(post);
  // }

  async remove(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }

    return await this.postsRepository.remove(post);
  }
}
