import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { request } from "graphql-request";
import InviteMultistepForm from "../../components/InviteMultistepForm";
import { InviteMultistepFormContextProvider } from "../../contexts/InviteMultistepFormContext";
import { InviteFragment } from "../../graphql/generated/types";

const protocol = `${process.env.NODE_ENV === "development" ? "http" : "https"}://`;

const host =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    : // Use host on the client since using VERCEL_URL can lead to CORS errors due to aliases
      window.location.host;

const origin = `${protocol}${host}`;

interface EditPageProps {
  invite: InviteFragment;
}

const EditPage = ({ invite }: EditPageProps) => {
  if (Object.keys(invite).length === 0) return <p>Invite doesn&apos;t exist</p>;

  return (
    <InviteMultistepFormContextProvider>
      <Head>
        <title>Edit - Zcal Clone</title>
      </Head>

      <InviteMultistepForm initialInviteInfo={invite} />
    </InviteMultistepFormContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<EditPageProps> = async (context) => {
  const session = await getSession(context);
  const user = session?.user;
  const { res } = context;

  if (!user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  const { invite } = await request(
    `${origin}/api/graphql`,
    `
      query GetInvite($input: InviteQueryInput!) {
        invite(input: $input) {
          id
          name
          description
          location
          timezone
          displayedTimezone
          duration
          dateRange
        intervals
          slotIncrement
          minimumNotice
          user {
            name
            email
          }
          events {
            id
            inviteeName
            inviteeEmail
            startDate
          }
        }
      }
    `,
    { input: { id: context.query.id } }
  );

  if (invite.user.email !== user?.email) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {
      invite,
    },
  };
};

export default EditPage;
