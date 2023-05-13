import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

/**
 * 유저 계정 정보 스키마입니다.
 * @author 현웅
 */
@Schema()
export class User {
  @Prop({ unique: true, trim: true }) // 이메일 (소셜 로그인을 이용하는 경우, 존재하지 않을 수도 있음)
  email: string;

  @Prop({ unique: true, required: true })
  planetCode: string;

  @Prop({ unique: true, trim: true }) // 닉네임
  nickname: string;

  @Prop({ required: true }) // 회원가입 일자
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
