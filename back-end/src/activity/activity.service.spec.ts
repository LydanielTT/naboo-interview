import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { TestModule, closeInMongodConnection } from "src/test/test.module";
import { ActivityModule } from "./activity.module";
import { Activity } from "./activity.schema";
import { ActivityService } from "./activity.service";

describe("ActivityService", () => {
  let service: ActivityService;
  let activityModel: Model<Activity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Activity.name),
          useValue: Model,
        },
      ],
      imports: [TestModule, ActivityModule],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    activityModel = module.get<Model<Activity>>(getModelToken(Activity.name));
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when creating an activity", () => {
    it("should call db with correct params", async () => {
      const activityData = {
        name: "test activity",
        city: "test city",
        description: "test description",
        price: 10,
      };
      const userId = "60a4fa6ff8ba5b0a929c1142";
      const expectedArgs = {
        ...activityData,
        owner: userId,
      };
      const createActivityMock = jest.spyOn(activityModel, "create");
      await service.create(userId, activityData);
      expect(createActivityMock).toHaveBeenCalledWith(expectedArgs);
    });
  });
});
