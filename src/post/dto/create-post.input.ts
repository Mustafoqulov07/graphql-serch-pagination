import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  userId!: number;
}
