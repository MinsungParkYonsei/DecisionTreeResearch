import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schema';

@Injectable()
export class UserCreateService {
  constructor(@InjectModel(User.name) private readonly User: Model<User>) {}

  /** 유저를 생성합니다. */
  async createUser() {
    return 'user created';
  }
}
