import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Activity } from "../activity/activity.schema";

export enum UserRoles {
  user = "user",
  admin = "admin",
}
registerEnumType(UserRoles, {
  name: "UserRoles",
});

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
  @Field(() => ID)
  id!: string;

  @Field(() => UserRoles)
  @Prop({ required: true, enum: ["user", "admin"], default: "user" })
  role!: UserRoles;

  @Field()
  @Prop({ required: true })
  firstName!: string;

  @Field()
  @Prop({ required: true })
  lastName!: string;

  @Field()
  @Prop({ required: true, unique: true })
  email!: string;

  @Field()
  @Prop({ required: true })
  password!: string;

  @Prop()
  token?: string;

  @Field(() => [Activity])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    default: [],
  })
  favoriteActivities!: Activity[];
}

export const UserSchema = SchemaFactory.createForClass(User);
