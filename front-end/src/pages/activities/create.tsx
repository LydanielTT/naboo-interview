import { PageTitle } from "@/components";
import ActivityForm from "@/components/Form/ActivityForm";
import { withAuth } from "@/hocs";
import { Paper } from "@mantine/core";
import Head from "next/head";

const CreateActivity = () => {
  // TODO use i18n
  const addActivityTitle = "Ajouter une activité";
  return (
    <>
      <Head>
        <title>Ajouter une activité | CDTR</title>
      </Head>
      {/* TODO use router.back for prevPath since we can come from /activities too */}
      <PageTitle title={addActivityTitle} prevPath="/discover" />
      <Paper shadow="xs" p="md">
        <ActivityForm />
      </Paper>
    </>
  );
};

export default withAuth(CreateActivity);
