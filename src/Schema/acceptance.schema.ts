import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * 요청에 대한 수락 정보입니다.
 * @author 현웅
 */
@Schema()
export class Acceptance {
  @Prop({ required: true, index: true }) // 수락자 _id
  acceptorId: string;

  @Prop({ required: true, index: true }) // 프로젝트 _id
  projectId: string;

  @Prop() // 수락 내용
  content?: string;

  @Prop() // 프로젝트 진행자로부터의 최종 수락 여부
  accepted?: boolean;
}

export const AcceptanceSchema = SchemaFactory.createForClass(Acceptance);

export type AcceptanceDocument = Acceptance & Document;
