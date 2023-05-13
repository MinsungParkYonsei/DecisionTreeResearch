import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * 프로젝트에 대한 요청 전파 정보입니다.
 * @author 현웅
 */
@Schema()
export class Proposal {
  @Prop({ required: true, index: true }) // 프로젝트 제안자 _id
  projectAuthorId: string;

  @Prop({ required: true, index: true }) // 프로젝트 _id
  projectId: string;

  @Prop({ required: true, type: [String] }) // 지금까지 전파자 (프로젝트 제안자까지 포함)
  spreaderIds: string[];

  @Prop({ required: true, index: true }) // 요청 대상 유저 _id
  targetUserId: string;

  @Prop({ type: [String] }) // 프로젝트에 필요한 스킬들
  requiredSkills: string[];

  @Prop({ default: false }) // 요청 처리 여부 (전파, 요청 수락, 거절, 수락 거절)
  handled?: boolean;

  @Prop({ required: true }) // 최대 허용 전파 거리
  maxStack: number;

  @Prop({ required: true }) // 전파 일자
  createdAt: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);

export type ProposalDocument = Proposal & Document;
