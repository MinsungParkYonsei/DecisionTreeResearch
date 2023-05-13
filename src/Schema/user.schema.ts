import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

/**
 * 유저 계정 정보 스키마입니다.
 * @author 현웅
 */
@Schema()
export class User {
  @Prop({ unique: true, trim: true }) // 닉네임
  nickname: string;

  @Prop({ required: true }) // 직업
  job: string;

  @Prop({})
  planetType?: string;

  @Prop({ unique: true, required: true })
  planetCode: string;

  @Prop({ required: true }) // 회원가입 일자
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
