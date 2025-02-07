import { PageTitle, SigninForm } from "@/components";
import { withoutAuth } from "@/hocs";
import { Paper } from "@mantine/core";
import Head from "next/head";

const Signin = () => {
  // TODO use i18n
  const loginTitle = "Connexion";
  return (
    <>
      <Head>
        <title>{loginTitle} | CDTR</title>
      </Head>
      <PageTitle title={loginTitle} />
      <Paper shadow="xs" p="md">
        <SigninForm />
      </Paper>
    </>
  );
};

export default withoutAuth(Signin);
