import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/byId')
  findOne(@Query('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get('/byUser')
  findAllByUsers(@Query('username') users: string[]) {
    return this.postsService.findAllByUsers(users);
  }

  @Get('/byDate')
  findAllSorted(@Query('order') orderType: 'asc' | 'desc') {
    return this.postsService.findAllOrderedByDate(orderType);
  }
}
