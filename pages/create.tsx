import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import InviteMultistepForm from "../components/InviteMultistepForm";
import { InviteMultistepFormContextProvider } from "../contexts/InviteMultistepFormContext";

const CreatePage = () => {
  return (
    <InviteMultistepFormContextProvider>
      <Head>
        <title>Create - ZCal Clone</title>
      </Head>

      <InviteMultistepForm />
    </InviteMultistepFormContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = session?.user;
  const { res } = context;

  // If user is not logged in, redirect to the homepage
  if (!user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
};

export default CreatePage;
