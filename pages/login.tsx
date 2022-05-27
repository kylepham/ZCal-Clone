import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="flex justify-center">
      <Head>
        <title>ZCal Clone - Login</title>
      </Head>
      <Login />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = session?.user;
  const { res } = context;

  // If user is logged in, redirect to the homepage
  if (user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {
      user: user || null,
    },
  };
};

export default LoginPage;
