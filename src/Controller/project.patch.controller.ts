import { Controller, Patch, Query, Body } from '@nestjs/common';
import { Project, Proposal } from 'src/Schema';
import {
  UserFindService,
  ProjectCreateService,
  ProjectUpdateService,
} from 'src/Service';

@Controller('projects')
export class ProjectPatchController {
  constructor(
    private readonly userFindService: UserFindService,
    private readonly projectCreateService: ProjectCreateService,
    private readonly projectUpdateService: ProjectUpdateService,
  ) {}

  /**
   * 프로젝트 요청 수락을 최종 수락할지 여부를 결정합니다.
   * @author 현웅
   */
  @Patch('acceptance')
  async acceptProposal(
    @Query('acceptanceId') projectId: string,
    @Body() body: { accepted: boolean },
  ) {
    return await this.projectUpdateService.updateAcceptanceAccepted({
      acceptanceId: projectId,
      accepted: body.accepted,
    });
  }
}
