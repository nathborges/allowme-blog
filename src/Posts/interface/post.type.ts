import { User } from 'src/Users/entity/user.entity';

export interface PostType {
  title: string;
  body: string;
  user: User;
  created_date: Date;
}
