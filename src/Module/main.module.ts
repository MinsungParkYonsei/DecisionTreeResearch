import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectGetController,
  ProjectPostController,
  UserGetController,
  UserPostController,
} from 'src/Controller';
import {
  ProjectCreateService,
  ProjectFindService,
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
    ProjectPostController,
    UserGetController,
    UserPostController,
  ],
  providers: [
    ProjectCreateService,
    ProjectFindService,
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
