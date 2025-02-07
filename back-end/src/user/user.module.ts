import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Activity, ActivitySchema } from "src/activity/activity.schema";
import { UserResolver } from "./user.resolver";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
  ],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
