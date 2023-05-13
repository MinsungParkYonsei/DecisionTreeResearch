import { Controller, Post } from '@nestjs/common';
import { UserCreateService } from 'src/Service';

@Controller('users')
export class UserPostController {
  constructor(private readonly userCreateService: UserCreateService) {}

  @Post('')
  createUser() {
    return 'user created';
  }
}
