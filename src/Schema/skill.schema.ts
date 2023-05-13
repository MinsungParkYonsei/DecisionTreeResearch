import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * 유저가 가진 능력 정보입니다.
 * @author 현웅
 */
@Schema()
export class Skill {
  @Prop({ unique: true, trim: true }) // 이메일 (소셜 로그인을 이용하는 경우, 존재하지 않을 수도 있음)
  email: string;

  @Prop({ unique: true, required: true })
  planetCode: string;

  @Prop({ unique: true, trim: true }) // 닉네임
  nickname: string;

  @Prop({ required: true }) // 회원가입 일자
  createdAt: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

export type SkillDocument = Skill & Document;
