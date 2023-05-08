import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRolesEnum } from '../enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: UserRolesEnum,
    default: UserRolesEnum.USER,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
