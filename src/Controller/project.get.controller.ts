import { Controller, Get } from '@nestjs/common';

@Controller('projects')
export class ProjectGetController {
  constructor() {}

  @Get('')
  createProject() {
    return 'get project';
  }
}
