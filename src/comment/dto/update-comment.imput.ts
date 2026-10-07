import { extend, Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCommentInput } from './create-comment.imput';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => Int)
  id!: number;
}
