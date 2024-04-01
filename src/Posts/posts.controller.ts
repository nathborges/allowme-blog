import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from './entity/post.entity';
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOkResponse({
    status: 201,
    type: PostEntity,
    description: 'Create new post.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request when trying to create a new post.',
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOkResponse({
    status: 200,
    type: [PostEntity],
    description: 'Get all posts',
  })
  @ApiBadRequestResponse({
    description: 'Bad request when trying to get all posts in the database',
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/byId')
  @ApiOkResponse({
    status: 200,
    type: PostEntity,
    description: 'Get post by Id',
  })
  @ApiBadRequestResponse({
    description: 'Bad request when trying to get the post by Id',
  })
  findOne(@Query('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get('/byUser')
  @ApiOkResponse({
    status: 200,
    type: [PostEntity],
    description: 'Get all posts by user',
  })
  @ApiBadRequestResponse({
    description: 'Bad request when trying to get the posts by user',
  })
  findAllByUsers(@Query('username') users: string[]) {
    return this.postsService.findAllByUsers(users);
  }

  @Get('/byDate')
  @ApiOkResponse({
    status: 200,
    type: [PostEntity],
    description: 'Get all posts ordered by date',
  })
  @ApiBadRequestResponse({
    description: 'Bad request when trying to get the post by date',
  })
  findAllSorted(@Query('order') orderType: 'asc' | 'desc') {
    return this.postsService.findAllOrderedByDate(orderType);
  }
}
