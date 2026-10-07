import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field(() => Int, { nullable: true })
  userId?: number;
}
