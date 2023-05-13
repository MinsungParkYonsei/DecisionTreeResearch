import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, User } from 'src/Schema';

@Injectable()
export class ProjectCreateService {
  constructor(
    @InjectModel(Project.name) private readonly Project: Model<Project>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /** 프로젝트를 생성합니다. */
  async createProject() {
    return 'project created';
  }
}
