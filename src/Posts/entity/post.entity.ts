import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/Users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  body: string;

  @ApiProperty()
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_date: Date;
}
