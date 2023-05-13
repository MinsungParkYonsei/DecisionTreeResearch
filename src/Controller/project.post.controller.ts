import { Controller, Post, Query, Body } from '@nestjs/common';
import { Project, Proposal } from 'src/Schema';
import {
  UserFindService,
  ProjectFindService,
  ProjectCreateService,
  ProjectUpdateService,
} from 'src/Service';

@Controller('projects')
export class ProjectPostController {
  constructor(
    private readonly userFindService: UserFindService,
    private readonly projectFindService: ProjectFindService,
    private readonly projectCreateService: ProjectCreateService,
    private readonly projectUpdateService: ProjectUpdateService,
  ) {}

  /**
   * 프로젝트를 만듭니다. 프로젝트에 대한 제안은 추후 생성합니다.
   * @author 현웅
   */
  @Post('')
  async createProject(
    @Query('userId') userId: string,
    @Body()
    body: {
      requiredJobs: string[];
      content: string;
      maxStack: number;
    },
  ) {
    const project: Project = {
      authorId: userId,
      requiredJobs: body.requiredJobs,
      content: body.content,
      maxStack: body.maxStack,
    };

    return await this.projectCreateService.createProject({ project });
  }

  /**
   * 본인의 프로젝트에 대한 요청을 전파합니다.
   * @author 현웅
   */
  @Post('proposal')
  async createProposal(
    @Query('userId') userId: string,
    @Query('projectId') projectId: string,
    @Body()
    body: {
      content: string;
      maxStack?: number;
    },
  ) {
    const users = await this.userFindService.getAdjacentUsers({
      userId,
    });
    const project = await this.projectFindService.getProjectById({
      projectId,
      selectQuery: { requiredJobs: true },
    });

    const proposals: Proposal[] = users.map((user) => {
      return {
        projectAuthorId: userId,
        projectId,
        requiredJobs: project.requiredJobs,
        content: body.content,
        targetUserId: user._id.toString(),
        spreaderIds: [user._id.toString()],
        maxStack: body.maxStack ?? 3,
        createdAt: new Date().toISOString(),
      };
    });

    return await this.projectCreateService.createProposals({ proposals });
  }

  /**
   * 자신이 받은 프로젝트 요청을 재전파합니다.
   * @author 현웅
   */
  @Post('spread')
  async spreadProposal(
    @Query('userId') userId: string,
    @Body()
    body: { proposal: Proposal & { _id: string } },
  ) {
    //* 이미 한계까지 전파되었다면 전파하지 않습니다.
    if (body.proposal.spreaderIds.length >= body.proposal.maxStack) return;

    //* 자신 주변의 유저들을 가져옵니다.
    const users = await this.userFindService.getAdjacentUsers({
      userId,
    });
    const proposals: Proposal[] = users.map((user) => {
      //* 대상자가 프로젝트 제안자라면 전파하지 않습니다.
      if (user._id.toString() === body.proposal.targetUserId) return;
      return {
        projectAuthorId: userId,
        projectId: body.proposal.projectId,
        requiredJobs: body.proposal.requiredJobs,
        targetUserId: user._id.toString(),
        spreaderIds: [...body.proposal.spreaderIds, user._id.toString()],
        maxStack: body.proposal.maxStack,
        createdAt: new Date().toISOString(),
      };
    });
    await this.projectCreateService.createProposals({ proposals });

    //* 이후 자신에게 들어온 요청의 처리 여부를 true 로 설정합니다.
    await this.projectUpdateService.updateProposalHandled({
      proposalId: body.proposal._id,
    });
  }

  /**
   * 프로젝트 요청을 받아들입니다.
   * 프로젝트 요청 수락 데이터를 생성하고, 프로젝트 요청의 처리 여부를 true 로 설정합니다.
   * @author 현웅
   */
  @Post('accept')
  async acceptProposal(
    @Query('userId') userId: string,
    @Query('proposalId') proposalId: string,
    @Query('projectId') projectId: string,
    @Body() body: { content: string },
  ) {
    //* 프로젝트 요청 수락 데이터 생성
    await this.projectCreateService.createAcceptance({
      acceptance: {
        acceptorId: userId,
        projectId,
        content: body.content,
      },
    });
    //* 프로젝트 요청 처리 여부를 true 로 설정
    await this.projectUpdateService.updateProposalHandled({
      proposalId,
    });
  }
}
