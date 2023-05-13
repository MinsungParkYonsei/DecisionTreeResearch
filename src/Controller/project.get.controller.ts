import { Controller, Query, Get } from '@nestjs/common';
import { ProjectFindService } from 'src/Service';

@Controller('projects')
export class ProjectGetController {
  constructor(private readonly projectFindService: ProjectFindService) {}

  /**
   * 특정 유저의 프로젝트를 가져옵니다.
   * @author 현웅
   */
  @Get('')
  async getUserProjects(@Query('userId') userId: string) {
    return await this.projectFindService.getProjects({
      filterQuery: { userId },
    });
  }

  /**
   * 특정 프로젝트 제안 정보를 가져옵니다.
   * @author 현웅
   */
  @Get('proposal')
  async getProjectProposals(@Query('projectId') projectId: string) {
    return await this.projectFindService.getProposals({
      filterQuery: { projectId },
    });
  }

  /**
   * 특정 프로젝트 제안에 대한 수락 정보 중, 아직 최종 수락 여부가 결정되지 않은 수락 정보를 가져옵니다.
   * @author 현웅
   */
  @Get('acceptance')
  async getProposalAcceptances(@Query('projectId') projectId: string) {
    return await this.projectFindService.getAcceptances({
      filterQuery: { projectId, accepted: null },
    });
  }
}
