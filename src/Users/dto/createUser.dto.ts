import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  username: string;
}
