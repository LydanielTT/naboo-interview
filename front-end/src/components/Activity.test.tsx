import { ActivityFragment } from "../graphql/generated/types";
import { Activity } from "./Activity";
import { render, screen } from "../test-utils";
import { Grid } from "@mantine/core";

const getDate = () => screen.queryByTestId("date");
const mockActivity: ActivityFragment = {
  id: "1",
  city: "Paris",
  description: "description",
  name: "name",
  price: 10,
  isFavorite: false,
  createdAt: new Date().toISOString(),
  owner: {
    firstName: "Jean",
    lastName: "Pierre",
  },
};
describe("le composant Activity", () => {
  it("n'affiche pas la date si non admin defini", () => {
    render(
      <Grid>
        <Activity activity={mockActivity} />{" "}
      </Grid>,
    );
    expect(getDate()).not.toBeInTheDocument();
  });
  it("n'affiche pas la date si l'user est non admin", () => {
    render(
      <Grid>
        <Activity activity={mockActivity} isAdmin={false} />
      </Grid>,
    );
    expect(getDate()).not.toBeInTheDocument();
  });

  it("affiche la date si l'user est admin", () => {
    render(
      <Grid>
        <Activity activity={mockActivity} isAdmin={true} />
      </Grid>,
    );
    expect(getDate()).toBeInTheDocument();
  });
});
