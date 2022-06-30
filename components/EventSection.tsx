import { Event } from "../graphql/generated/types";
import EventCard from "./EventCard";

interface EventProps extends Event {
  duration: number;
  inviteName: string;
}

interface EventSectionProps {
  events?: EventProps[];
}

const EventSection = ({ events }: EventSectionProps) => {
  return (
    <div className="w-full">
      <p>Upcoming events</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex">
        {!!!events || events.length === 0 ? (
          <p className="text-sm text-gray-400">
            You don&apos;t have any upcoming events. Share your invites to have people schedule meetings with you!
          </p>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
};

export default EventSection;
