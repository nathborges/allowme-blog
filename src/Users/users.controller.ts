import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entity/user.entity';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({
    status: 201,
    description: 'Create user in the database.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request when trying to create a new user.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'List of users in the database.',
    type: [User],
  })
  @ApiBadRequestResponse({
    description:
      'Bad Request when trying to get the list of users in the database.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/byId')
  @ApiOkResponse({
    status: 200,
    description: 'User found.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request when trying to get the user.',
  })
  findOne(@Query('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
