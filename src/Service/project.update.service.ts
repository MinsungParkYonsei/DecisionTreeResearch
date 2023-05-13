import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Acceptance, Project, Proposal, User } from 'src/Schema';

@Injectable()
export class ProjectUpdateService {
  constructor(
    @InjectModel(Acceptance.name)
    private readonly Acceptance: Model<Acceptance>,
    @InjectModel(Project.name) private readonly Project: Model<Project>,
    @InjectModel(Proposal.name) private readonly Proposal: Model<Proposal>,
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  /**
   * 프로젝트 요청을 처리 상태로 바꿉니다.
   * @author 현웅
   */
  async updateProposalHandled(param: { proposalId: string }) {
    await this.Proposal.findByIdAndUpdate(param.proposalId, {
      $set: { handled: true },
    });
  }

  /**
   * 프로젝트 제안을 수락합니다.
   * @author 현웅
   */
  async acceptProposal(param: { proposalId: string; content: string }) {
    return await this.Proposal.findByIdAndUpdate(param.proposalId, {
      $set: {
        handled: true,
        accepted: true,
        content: param.content,
      },
    }).lean();
  }

  /**
   * 프로젝트 제안 수락을 받아들일지 거절할지 값을 업데이트합니다.
   * @author 현웅
   */
  async updateAcceptanceAccepted(param: {
    acceptanceId: string;
    accepted: boolean;
  }) {
    await this.Acceptance.findByIdAndUpdate(param.acceptanceId, {
      $set: { accepted: param.accepted },
    });
  }
}
