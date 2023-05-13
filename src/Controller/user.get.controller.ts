import { Controller, Get, Query } from '@nestjs/common';
import { UserFindService } from 'src/Service';

@Controller('users')
export class UserGetController {
  constructor(private readonly userFindService: UserFindService) {}

  /**
   * 특정 유저 정보를 가져옵니다.
   * @author 현웅
   */
  @Get('')
  async getUser(@Query('userId') userId: string) {
    return await this.userFindService.getUserById({ userId });
  }

  /**
   * 나와 연결된 유저들을 가져옵니다.
   * @author 현웅
   */
  @Get('adjacent')
  async getAdjacentUsers(@Query('userId') userId: string) {
    return await this.userFindService.getAdjacentUsers({ userId });
  }
}
