import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserModule } from "./user.module";
import { randomUUID } from "crypto";
import { TestModule, closeInMongodConnection } from "src/test/test.module";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model, Query, Types } from "mongoose";
import { Activity } from "../activity/activity.schema";

describe("UserService", () => {
  let userService: UserService;
  let userModel: Model<User>;

  const mockUserModel = {
    findOneAndUpdate: jest.fn(),
    exec: jest.fn(),
  };
  const mockActivityModel = {
    create: jest.fn(),
  };
  const activityServiceMock = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule, UserModule],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("basic create / get", async () => {
    const email = randomUUID() + "@test.com";
    const user = await userService.createUser({
      email,
      password: "password",
      firstName: "firstName",
      lastName: "lastName",
    });

    const fetchedUser = await userService.getById(user.id);

    expect(fetchedUser).toMatchObject({
      email,
      firstName: "firstName",
      lastName: "lastName",
    });
  });
  describe("", () => {
    beforeEach(async () => {});

    it("should add favorite activity", async () => {
      const findOneAndUpdate = jest
        .spyOn(userModel, "findOneAndUpdate")
        .mockReturnValue({ exec: jest.fn().mockResolvedValue("mocked User") } as unknown as Query<User, User>);

      const email = randomUUID() + "@test.com";
      const user = await userService.createUser({
        email,
        password: "password",
        firstName: "firstName",
        lastName: "lastName",
      });
      const activityId = "60a4fa6ff8ba5b0a929c1142";
      await userService.addFavoriteActivity(user.id, activityId);
      expect(findOneAndUpdate).toHaveBeenCalled();
    });
  });
});
