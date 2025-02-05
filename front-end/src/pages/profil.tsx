import { PageTitle } from "@/components";
import { graphqlClient } from "@/graphql/apollo";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { Avatar, Flex, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface ProfileProps {
  favoriteActivities: {
    id: string;
    name: string;
  }[];
}

const Profile = (props: ProfileProps) => {
  const { user } = useAuth();
  const title = "Mon profil"; // TODO use i18n

  return (
    <>
      <Head>
        <title>{title} | CDTR</title>
      </Head>
      <PageTitle title={title} />
      <Flex direction="column" align="center" gap="md" justify="space-between">
        <Avatar color="cyan" radius="xl" size="lg">
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
        <Flex direction="column">
          <Text>{user?.email}</Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>
        </Flex>
        <Flex direction="column">
          <Text>Favoris</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default withAuth(Profile);
