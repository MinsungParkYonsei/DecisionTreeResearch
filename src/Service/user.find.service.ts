import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  Acceptance,
  Connection,
  Proposal,
  Project,
  User,
  UserDocument,
} from '../Schema';

@Injectable()
export class UserFindService {
  constructor(
    @InjectModel(Connection.name)
    private readonly Connection: Model<Connection>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /** 특정 유저를 _id 로 조회합니다. */
  async getUserById(param: {
    userId: string;
    selectQuery?: Partial<Record<keyof User, boolean>>;
  }) {
    return await this.User.findById(param.userId)
      .select(param.selectQuery)
      .lean();
  }

  /** 특정 유저를 planetCode 로 조회합니다. */
  async getUserByPlanetCode(param: {
    planetCode: string;
    selectQuery?: Partial<Record<keyof UserDocument, boolean>>;
  }) {
    return await this.User.findOne({ planetCode: param.planetCode })
      .select(param.selectQuery)
      .lean();
  }

  /** 다수 유저를 원하는 조건으로 찾습니다. */
  async getUsers(param: {
    filterQuery: FilterQuery<User>;
    selectQuery?: Partial<Record<keyof User, boolean>>;
  }) {
    return await this.User.find(param.filterQuery)
      .select(param.selectQuery)
      .lean();
  }

  /**
   * 다수의 유저 관계를 원하는 조건으로 찾습니다.
   * @author 현웅
   */
  async getConnections(param: {
    filterQuery: FilterQuery<Connection>;
    selectQuery?: Partial<Record<keyof Connection, boolean>>;
  }) {
    return await this.Connection.find(param.filterQuery)
      .select(param.selectQuery)
      .lean();
  }

  //* 활용형

  /**
   * 내 주변 유저들을 가져옵니다.
   * @author 현웅
   */
  async getAdjacentUsers(param: { userId: string }) {
    const connections = await this.getConnections({
      filterQuery: { requesterId: param.userId, accepted: true },
      selectQuery: { accepterId: true },
    });
    const connectedUserIds = connections.map(
      (connection) => connection.accepterId,
    );
    return await this.getUsers({
      filterQuery: { _id: { $in: connectedUserIds } },
    });
  }
}
