import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * 프로젝트에 대한 요청 전파 정보입니다.
 * @author 현웅
 */
@Schema()
export class Proposal {
  @Prop({ required: true, index: true }) // 프로젝트 _id
  projectId: string;

  @Prop({ required: true }) // 마지막 전파자
  spreaderId: string;

  @Prop({ required: true }) // 현재 전파 거리
  stack: number;

  @Prop({ required: true }) // 전파 일자
  createdAt: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);

export type ProposalDocument = Proposal & Document;
