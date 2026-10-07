import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const existsUser = await this.db.user.findUnique({
      where: { username: createUserInput.username },
    });
    if (existsUser) {
      throw new ConflictException('Username already exists');
    }
    return this.db.user.create({ data: createUserInput });
  }

  async findAll() {
    return this.db.user.findMany({
      include: { posts: { include: { comments: true } } },
    });
  }

  async findOne(id: number) {
    const user = await this.db.user.findUnique({
      where: { id },
      include: { posts: { include: { comments: true } } },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.findOne(id);
    if (updateUserInput.username) {
      const existsUser = await this.db.user.findFirst({
        where: { username: updateUserInput.username, NOT: { id } },
      });

      if (existsUser) {
        throw new ConflictException('Username already exists');
      }
    }
    return this.db.user.update({ where: { id }, data: updateUserInput });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.user.delete({ where: { id } });
  }
}
