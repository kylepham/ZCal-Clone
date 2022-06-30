import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@mui/material";
import { Event } from "../graphql/generated/types";
import { useUserContext } from "../contexts/UserContext";
import InviteSection from "../components/InviteSection";
import EventSection from "../components/EventSection";

interface EventProps extends Event {
  duration: number;
  inviteName: string;
}

const Home = () => {
  const { user } = useUserContext();

  const events = useMemo(() => {
    const result: EventProps[] = [];

    user?.invites.forEach((invite) =>
      result.push(...invite.events.map((event) => ({ ...event, duration: invite.duration, inviteName: invite.name })))
    );

    return result;
  }, [user?.invites]);

  return (
    <div className="flex flex-col items-center space-y-8 p-4 lg:px-16">
      <Head>
        <title>ZCal Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!!user ? (
        <>
          <h1 className="text-4xl font-bold">Hi, {user.name}!</h1>

          <Link href="/create">
            <Button>New Invite</Button>
          </Link>

          <InviteSection invites={user?.invites} />

          <EventSection events={events} />
        </>
      ) : (
        <p>ZCal Clone</p>
      )}
    </div>
  );
};

export default Home;
