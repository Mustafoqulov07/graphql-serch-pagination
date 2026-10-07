import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id!: number;

  @Field()
  text!: string;

  @Field(() => User)
  user!: User;

  @Field(() => Post)
  post!: Post;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
