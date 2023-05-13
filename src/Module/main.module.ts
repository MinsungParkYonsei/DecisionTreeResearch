import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectGetController,
  ProjectPatchController,
  ProjectPostController,
  UserGetController,
  UserPostController,
} from 'src/Controller';
import {
  ProjectCreateService,
  ProjectFindService,
  ProjectUpdateService,
  UserCreateService,
  UserFindService,
} from 'src/Service';
import {
  Acceptance,
  AcceptanceSchema,
  Connection,
  ConnectionSchema,
  Proposal,
  ProposalSchema,
  Project,
  ProjectSchema,
  User,
  UserSchema,
} from 'src/Schema';

@Module({
  controllers: [
    ProjectGetController,
    ProjectPatchController,
    ProjectPostController,
    UserGetController,
    UserPostController,
  ],
  providers: [
    ProjectCreateService,
    ProjectFindService,
    ProjectUpdateService,
    UserCreateService,
    UserFindService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Acceptance.name, schema: AcceptanceSchema },
      { name: Connection.name, schema: ConnectionSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class MainModule {}
