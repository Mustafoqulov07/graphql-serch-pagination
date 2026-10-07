import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostFilterInput } from './dto/filtter-post.input';
import { PaginationInput } from './dto/pagination-input';

@Injectable()
export class PostService {
    constructor(private readonly db: PrismaService) { }

    async create(createPostInput: CreatePostInput) {
        const user = await this.db.user.findUnique({
            where: { id: createPostInput.userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.db.post.create({
            data: createPostInput,
            include: { user: true, comments: true },
        });
    }

    async findAll(filter?: PostFilterInput, pagination?: PaginationInput) {
        const limit = 2;

        const page = pagination?.page ?? 1;

        if (page < 1) {
            throw new BadRequestException('Page must be greater than 0');
        }

        const skip = (page - 1) * limit;

        return this.db.post.findMany({
            where: {
                ...(filter?.userId && {
                    userId: filter.userId,
                }),

                ...(filter?.search && {
                    OR: [
                        {
                            title: {
                                contains: filter.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            description: {
                                contains: filter.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },

            skip,
            take: limit,

            include: {
                user: true,
                comments: true,
            },
        });
    }

    async findOne(id: number) {
        const post = await this.db.post.findUnique({
            where: { id },
            include: { user: true, comments: true },
        });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async update(id: number, updatePostInput: UpdatePostInput) {
        await this.findOne(id);

        if (updatePostInput.userId) {
            const user = await this.db.user.findUnique({
                where: { id: updatePostInput.userId },
            });
            if (!user) {
                throw new NotFoundException('User not found');
            }
        }

        return this.db.post.update({
            where: { id },
            data: updatePostInput,
            include: {
                user: true,
                comments: true,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.db.post.delete({ where: { id } });
    }
}
