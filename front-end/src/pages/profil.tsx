import { ActivityListItem, PageTitle } from "@/components";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { Avatar, Divider, Flex, Grid, Tabs, Text } from "@mantine/core";
import Head from "next/head";
import { Fragment } from "react";
import FavoriteActivitiesTable from "./favoriteActivitiesTable";


const Profile = () => {
  const { user } = useAuth();
  const title = "Mon profil"; // TODO use i18n
  return (
    <>
      <Head>
        <title>{title} | CDTR</title>
      </Head>
      <PageTitle title={title} />
      <Flex direction="column" align="left" gap="md" justify="space-between">
        <Avatar color="cyan" radius="xl" size="lg">
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
        <Flex direction="column">
          <Text>{user?.email}</Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>
        </Flex>

        <Grid>
          <Grid.Col>
            <PageTitle title="Favoris" />
          </Grid.Col>
          <Grid.Col>
            <Tabs
              defaultValue="favoriteActivities"
              styles={{ tab: { padding: "0.5rem", fontSize: "1.2rem", height: "100%" } }}
            >
              <Tabs.List>
                <Tabs.Tab value="favoriteActivitiesTable">Favoris Table</Tabs.Tab>
                <Tabs.Tab value="favoriteActivities">Favoris List </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="favoriteActivitiesTable">
                <Grid.Col>
                  <FavoriteActivitiesTable favoriteActivities={user?.favoriteActivities} />
                </Grid.Col>
              </Tabs.Panel>
              <Tabs.Panel value="favoriteActivities">
                <Grid.Col>
                  {user?.favoriteActivities?.map((favoriteActivity, idx) => (
                    <Fragment key={favoriteActivity.id}>
                      <ActivityListItem activity={favoriteActivity} />
                      {idx < user?.favoriteActivities?.length - 1 && <Divider my="sm" />}
                    </Fragment>
                  ))}
                </Grid.Col>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  );
};

export default withAuth(Profile);
