import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from 'bcrypt';
import { CreateUserDto, createUserSchema } from "src/dto/user";
import { ZodValidationPipe } from "src/pipes/zod.pipe";

@Controller("/user")
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserDto) {
    const userCreateBody = {
      name: body.name,
      email: body.email,
      password: body.password,
    };

    const userWithSameEmail = await this.prisma.user.findUnique({
        where: {
            email: userCreateBody.email
        }
    }
    )

    if (userWithSameEmail) {
        throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await hash(userCreateBody.password, 8);

    userCreateBody.password = hashedPassword;

    const returnCreate = await this.prisma.user.create({
        data: userCreateBody
    })

    return returnCreate;
  }
}
