import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  Acceptance,
  AcceptanceDocument,
  Proposal,
  ProposalDocument,
  Project,
  ProjectDocument,
  User,
} from 'src/Schema';

@Injectable()
export class ProjectFindService {
  constructor(
    @InjectModel(Acceptance.name)
    private readonly Acceptance: Model<Acceptance>,
    @InjectModel(Project.name) private readonly Project: Model<Project>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /**
   * 프로젝트를 원하는 조건으로 가져옵니다.
   * @author 현웅
   */
  async getProjects(param: {
    filterQuery: FilterQuery<Project>;
    selectQuery?: Partial<Record<keyof ProjectDocument, boolean>>;
  }) {
    return await this.Project.find(param.filterQuery)
      .select(param.selectQuery)
      .lean();
  }

  /**
   * 프로젝트 제안 정보를 원하는 조건으로 가져옵니다.
   * @author 현웅
   */
  async getProposals(param: {
    filterQuery: FilterQuery<Project>;
    selectQuery?: Partial<Record<keyof ProjectDocument, boolean>>;
  }) {
    return await this.Project.find(param.filterQuery)
      .select(param.selectQuery)
      .lean();
  }

  /**
   * 프로젝트 제안에 대한 수락 정보를 원하는 조건으로 가져옵니다.
   * @author 현웅
   */
  async getAcceptances(param: {
    filterQuery: FilterQuery<Acceptance>;
    selectQuery?: Partial<Record<keyof AcceptanceDocument, boolean>>;
  }) {
    return await this.Acceptance.find(param.filterQuery)
      .select(param.selectQuery)
      .lean();
  }
}
