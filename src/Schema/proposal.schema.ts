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

  @Prop({ default: false }) // 요청 처리 여부 (전파, 요청 수락, 거절, 수락 거절)
  handled?: boolean;

  @Prop() // 요청 수락 여부
  accepted?: boolean;

  @Prop() // 요청 수락에 대한 거절 여부
  declined?: boolean;

  @Prop() // 수락되었을 경우, 수락자가 추가하는 내용
  content?: string;

  @Prop({ required: true }) // 최대 허용 전파 거리
  maxStack: number;

  @Prop({ required: true }) // 전파 일자
  createdAt: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);

export type ProposalDocument = Proposal & Document;
