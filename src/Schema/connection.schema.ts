import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * 유저 간 연결 정보 스키마입니다.
 * @author 현웅
 */
@Schema()
export class Connection {
  @Prop({ required: true }) // 연결 요청자
  requesterId: string;

  @Prop({ required: true }) // 연결 수락자
  accepterId: string;

  @Prop({ required: true }) // 연결 (요청) 일자
  createdAt: string;

  @Prop({ default: false }) // 연결 성립 여부
  accepted?: boolean;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);

export type ConnectionDocument = Connection & Document;
