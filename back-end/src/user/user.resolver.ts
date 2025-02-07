import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Activity } from '../activity/activity.schema';
import { AuthGuard } from '../auth/auth.guard';
import { ContextWithJWTPayload } from '../auth/types/context';
import { AddFavoriteActivityInput, RemoveFavoriteActivityInput } from './user.inputs.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => [Activity])
  async favoriteActivities(@Parent() user: User): Promise<Activity[]> {
      await user.populate('favoriteActivities');
      return user.favoriteActivities;
    }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async addFavoriteActivity(
    @Context() context: ContextWithJWTPayload,
    @Args('addFavoriteActivityInput')
    { activityId }: AddFavoriteActivityInput,
  ): Promise<User> {
    return this.userService.addFavoriteActivity(
      context.jwtPayload.id,
      activityId,
    );
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async removeFavoriteActivity(
    @Context() context: ContextWithJWTPayload,
    @Args('removeFavoriteActivityInput')
    { activityId }: RemoveFavoriteActivityInput,
  ): Promise<User> {
    return this.userService.removeFavoriteActivity(
      context.jwtPayload.id,
      activityId,
    );
  }

}
