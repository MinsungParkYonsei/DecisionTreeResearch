import { Controller, Post, Body, Query } from '@nestjs/common';
import { User } from 'src/Schema';
import { UserFindService, UserCreateService } from 'src/Service';

@Controller('users')
export class UserPostController {
  constructor(
    private readonly userFindService: UserFindService,
    private readonly userCreateService: UserCreateService,
  ) {}

  /**
   * 유저를 생성합니다.
   * @author 현웅
   */
  @Post('')
  async createUser(@Body() body: { email: string; planetType: string }) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let planetCode = '';
    for (let i = 0; i < 8; i++) {
      planetCode += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    const user: User = {
      email: body.email,
      planetType: body.planetType,
      planetCode,
      createdAt: new Date().toISOString(),
    };

    return await this.userCreateService.createUser({ user });
  }

  /**
   * 유저 간 연결을 요청합니다. planetCode 로 요청합니다.
   * @author 현웅
   */
  @Post('connection')
  async requestConnection(
    @Query('userId') userId: string,
    @Query('planetCode') planetCode: string,
  ) {
    const targetUser = await this.userFindService.getUserByPlanetCode({
      planetCode,
      selectQuery: { _id: true },
    });

    return await this.userCreateService.createConnection({
      connection: {
        requesterId: userId,
        accepterId: targetUser._id.toString(),
        createdAt: new Date().toISOString(),
      },
    });
  }

  /**
   * 연결 요청을 수락합니다.
   * @author 현웅
   */
  @Post('connection/accept')
  async acceptConnection(@Query('connectionId') connectionId: string) {
    return await this.userCreateService.acceptConnection({ connectionId });
  }
}
