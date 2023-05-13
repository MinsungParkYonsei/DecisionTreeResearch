import { Controller, Inject, Get } from '@nestjs/common';
import { UserFindService } from 'src/Service';

@Controller('users')
export class UserGetController {
  constructor(private readonly userFindService: UserFindService) {}

  @Get('')
  getUser() {
    return this.userFindService.findUser();
  }
}
