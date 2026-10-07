import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [Post])
  posts!: Post[];

  @Field(() => [Comment])
  comments!: Comment[];
}
