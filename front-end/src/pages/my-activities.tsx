import { Activity, EmptyData, PageTitle } from "@/components";
import { graphqlClient } from "@/graphql/apollo";
import {
  GetUserActivitiesQuery,
  GetUserActivitiesQueryVariables,
} from "@/graphql/generated/types";
import GetUserActivities from "@/graphql/queries/activity/getUserActivities";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { Button, Grid, Group } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface MyActivitiesProps {
  activities: GetUserActivitiesQuery["getActivitiesByUser"];
}

export const getServerSideProps: GetServerSideProps<
  MyActivitiesProps
> = async ({ req }) => {
  const response = await graphqlClient.query<
    GetUserActivitiesQuery,
    GetUserActivitiesQueryVariables
  >({
    query: GetUserActivities,
    context: { headers: { Cookie: req.headers.cookie } },
  });
  return { props: { activities: response.data.getActivitiesByUser } };
};

const MyActivities = ({ activities }: MyActivitiesProps) => {
  const { user } = useAuth();

  // TODO use i18n
  const myActivitiesTitle = "Mes activités";
  const buttonLabel = "Ajouter une activité"; // factorize with i18n
  
  return (
    <>
      <Head>
        <title>{myActivitiesTitle} | CDTR</title>
      </Head>
      <Group position="apart">
        <PageTitle title={myActivitiesTitle} />
        {user && (
          <Link href="/activities/create">
            <Button>{buttonLabel}</Button>
          </Link>
        )}
      </Group>
      <Grid>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <Activity activity={activity} key={activity.id} />
          ))
        ) : (
          <EmptyData />
        )}
      </Grid>
    </>
  );
};

export default withAuth(MyActivities);
