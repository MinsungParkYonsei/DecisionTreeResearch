import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, User } from 'src/Schema';

@Injectable()
export class ProjectFindService {
  constructor(
    @InjectModel(Project.name) private readonly Project: Model<Project>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /** 프로젝트를 찾습니다. */
  async findProject() {
    return 'project found';
  }
}
