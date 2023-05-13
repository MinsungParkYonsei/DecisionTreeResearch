import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * 유저가 생성한 프로젝트 스키마입니다.
 * @author 현웅
 */
@Schema()
export class Project {
  @Prop({ required: true, index: true }) // 연결 요청자
  authorId: string;

  @Prop({ required: true }) // 프로젝트에 필요한 인원 스펙
  requiredSkills: string[];

  @Prop({ required: true }) // 프로젝트 요청 내용
  content: string;

  @Prop({ required: true }) // 연결을 위해 최대로 뻗어나갈 수 있는 거리
  maxStack: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

export type ProjectDocument = Project & Document;
