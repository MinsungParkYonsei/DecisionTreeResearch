import { Controller, Post } from '@nestjs/common';
import { ProjectCreateService } from 'src/Service';

@Controller('projects')
export class ProjectPostController {
  constructor(private readonly projectCreateService: ProjectCreateService) {}

  @Post('')
  createProject() {
    return 'project created';
  }
}
