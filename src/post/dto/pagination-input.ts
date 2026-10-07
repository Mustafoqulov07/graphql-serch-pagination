import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
    @Field(() => Int, { defaultValue: 1 })
    page!: number;
}
