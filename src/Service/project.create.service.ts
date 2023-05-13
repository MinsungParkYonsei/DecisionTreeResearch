import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Acceptance, Project, Proposal, User } from 'src/Schema';

@Injectable()
export class ProjectCreateService {
  constructor(
    @InjectModel(Acceptance.name)
    private readonly Acceptance: Model<Acceptance>,
    @InjectModel(Project.name) private readonly Project: Model<Project>,
    @InjectModel(Proposal.name) private readonly Proposal: Model<Proposal>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /**
   * 프로젝트를 생성합니다.
   * @author 현웅
   */
  async createProject(param: { project: Project }) {
    const newProject = await this.Project.create([param.project]);
    return newProject[0].toObject();
  }

  /**
   * 프로젝트 제안들을 생성합니다.
   * @author 현웅
   */
  async createProposals(param: { proposals: Proposal[] }) {
    const createdProposals = await this.Proposal.create(param.proposals);
    return createdProposals;
  }

  /**
   * 프로젝트 제안 수락 정보를 생성합니다.
   * @param param
   */
  async createAcceptance(param: { acceptance: Acceptance }) {
    const createdAcceptance = await this.Acceptance.create([param.acceptance]);
    return createdAcceptance[0].toObject();
  }
}
