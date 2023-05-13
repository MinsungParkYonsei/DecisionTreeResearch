import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection, User } from 'src/Schema';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectModel(Connection.name)
    private readonly Connection: Model<Connection>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /**
   * 유저를 생성합니다.
   * @author 현웅
   */
  async createUser(param: { user: User }) {
    const newUser = await this.User.create([param.user]);
    return newUser[0].toObject();
  }

  /**
   * 유저 간 연결 정보를 생성합니다.
   * @author 현웅
   */
  async createConnection(param: { connection: Connection }) {
    const newConnection = await this.Connection.create([param.connection]);
    return newConnection[0].toObject();
  }

  /**
   * 기존에 있던 유저 연결 요청을 수락하고 새로운 유저 간 연결 정보를 생성합니다.
   * @author 현웅
   */
  async acceptConnection(param: { connectionId: string }) {
    const acceptedConnection = await this.Connection.findByIdAndUpdate(
      param.connectionId,
      { accepted: true },
      { new: true },
    ).lean();

    const newConnection = await this.Connection.create([
      {
        requesterId: acceptedConnection.accepterId,
        accepterId: acceptedConnection.requesterId,
        createdAt: new Date().toISOString(),
        accepted: true,
      },
    ]);

    return newConnection[0].toObject();
  }
}
