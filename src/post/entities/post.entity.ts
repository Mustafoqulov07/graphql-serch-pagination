import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => User)
  user!: User;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [Comment])
  comments!: Comment[];
}
