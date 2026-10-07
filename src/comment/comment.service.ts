import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.imput';
import { UpdateCommentInput } from './dto/update-comment.imput';

@Injectable()
export class CommentService {
  constructor(private readonly db: PrismaService) {}

  async create(createCommentInput: CreateCommentInput) {
    const user = await this.db.user.findUnique({
      where: { id: createCommentInput.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.db.post.findUnique({
      where: { id: createCommentInput.postId },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.db.comment.create({
      data: createCommentInput,
      include: { user: true, post: true },
    });
  }

  async findAll() {
    return this.db.comment.findMany({ include: { post: true, user: true } });
  }

  async findOne(id: number) {
    const comment = await this.db.comment.findUnique({
      where: { id },
      include: {
        user: true,
        post: true,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    await this.findOne(id);

    if (updateCommentInput.postId) {
      const post = await this.db.post.findUnique({
        where: { id: updateCommentInput.postId },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }
    }

    if (updateCommentInput.userId) {
      const user = await this.db.user.findUnique({
        where: { id: updateCommentInput.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    return this.db.comment.update({
      where: { id },
      data: updateCommentInput,
      include: { user: true, post: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.comment.delete({ where: { id } });
  }
}
