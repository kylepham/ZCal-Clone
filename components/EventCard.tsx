import { useMemo, useState } from "react";
import moment from "moment-timezone";
import { Card, CardContent, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineCancelPresentation, MdOutlineTimelapse, MdOutlineSubtitles } from "react-icons/md";
import { GetUserDocument, Event, useDeleteEventMutation } from "../graphql/generated/types";
import { useUserContext } from "../contexts/UserContext";

interface EventProps extends Event {
  duration: number;
  inviteName: string;
}

interface EventCardProps {
  event: EventProps;
}

const EventCard = ({ event }: EventCardProps) => {
  const [deleteEvent, { loading: isDeletingEvent }] = useDeleteEventMutation({ refetchQueries: [GetUserDocument] });

  const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  const eventDate = useMemo(() => moment(Number.parseInt(event.startDate)).format("ddd, MMM DD"), [event]);

  const eventStartTime = useMemo(() => moment(Number.parseInt(event.startDate)).format("h:mm a"), [event]);

  const eventEndTime = useMemo(
    () =>
      moment(Number.parseInt(event.startDate))
        .add(event.duration, "minutes")
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format("h:mm a z"),
    [event]
  );

  return (
    <Card className="border border-slate-400 bg-transparent bg-none shadow-none lg:w-[20rem]">
      <CardContent className="flex w-full items-start space-x-4">
        <div>
          <BsCalendarEvent className="fill-yellow-400" size={20} />
        </div>

        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="flex overflow-hidden whitespace-nowrap">
            <Typography
              onClick={() => setOpen(true)}
              className="overflow-hidden overflow-ellipsis text-lg font-bold hover:cursor-pointer"
            >
              {event.inviteeName} and {user?.name}
            </Typography>
          </div>

          <Typography className="text-slate-500">{eventDate}</Typography>

          <Typography className="text-slate-500">
            {eventStartTime} - {eventEndTime}
          </Typography>
        </div>

        <IconButton
          onClick={async () => {
            await deleteEvent({ variables: { input: { id: event.id } } });
          }}
        >
          {isDeletingEvent ? <CircularProgress size={20} /> : <MdOutlineCancelPresentation size={20} />}
        </IconButton>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className="scrollbar absolute top-1/2 max-h-full w-full -translate-y-1/2 space-y-4 overflow-y-auto bg-gray-900 p-4 md:left-1/2 md:max-w-2xl md:-translate-x-1/2">
            <div className="flex items-center space-x-4">
              <MdOutlineSubtitles className="fill-gray-400" size={15} />

              <div>
                <Typography className="font-bold text-gray-400">
                  {event.inviteeName} and {user?.name}
                </Typography>

                <Typography className="text-sm text-gray-400">in {JSON.stringify(event.inviteName)}</Typography>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <BsCalendarEvent className="fill-green-400" size={15} />

              <Typography className="font-bold text-green-400">
                {eventDate}, {eventStartTime} - {eventEndTime}
              </Typography>
            </div>

            <div className="flex items-center space-x-4">
              <MdOutlineTimelapse className="fill-green-400" size={15} />
              <Typography className="text-green-400">{event.duration} min</Typography>
            </div>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default EventCard;
