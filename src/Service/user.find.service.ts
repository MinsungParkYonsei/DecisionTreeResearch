import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Acceptance, Connection, Proposal, Project, User } from '../Schema';

@Injectable()
export class UserFindService {
  constructor(@InjectModel(User.name) private readonly User: Model<User>) {}

  /** 유저를 찾습니다. */
  async findUser() {
    return 'user found';
  }
}
