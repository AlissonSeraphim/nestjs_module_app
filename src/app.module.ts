import { Module, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  })],
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}
