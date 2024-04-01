import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe' })
  @Column({ type: 'text', nullable: false })
  full_name: string;

  @ApiProperty({ example: 'johndoe95' })
  @Column({ type: 'text', nullable: false })
  username: string;

  @ApiProperty({ example: '2024-04-01 01:31:18.168235' })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_date: Date;
}
