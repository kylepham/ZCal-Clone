import { MouseEvent, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CircularProgress, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { BsPerson, BsThreeDotsVertical } from "react-icons/bs";
import { GetUserDocument, Invite, useDeleteInviteMutation } from "../graphql/generated/types";

const protocol = `${process.env.NODE_ENV === "development" ? "http" : "https"}://`;

const host =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    : // Use host on the client since using VERCEL_URL can lead to CORS errors due to aliases
      window.location.host;

const origin = `${protocol}${host}`;

interface InviteCardProps {
  invite: Invite;
}

const InviteCard = ({ invite }: InviteCardProps) => {
  const [deleteInvite, { loading: isDeletingInvite }] = useDeleteInviteMutation({ refetchQueries: [GetUserDocument] });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Card className="border border-slate-400 bg-transparent bg-none shadow-none lg:w-[20rem]">
      <CardContent className="flex w-full items-start space-x-4">
        <div>
          <BsPerson className="fill-yellow-400" size={25} />
        </div>

        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="flex overflow-hidden whitespace-nowrap">
            <Link href={`/edit/${invite.id}`}>
              <Typography className="overflow-hidden overflow-ellipsis text-lg font-bold hover:cursor-pointer">
                {invite.name}
              </Typography>
            </Link>
          </div>

          <Typography className="text-slate-500">{invite.duration} min</Typography>
        </div>

        <IconButton className="relative" onClick={handleClick}>
          {isDeletingInvite ? <CircularProgress size={20} /> : <BsThreeDotsVertical size={20} />}
        </IconButton>

        <Menu
          open={isOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleClose}
        >
          <MenuItem
            onClick={async () => {
              await navigator.clipboard.writeText(`${origin}/invite/${invite.id}`);
              handleClose();
            }}
          >
            Copy Link
          </MenuItem>

          <Link href={`/edit/${invite.id}`}>
            <MenuItem className="" onClick={handleClose}>
              Edit
            </MenuItem>
          </Link>

          <MenuItem
            onClick={async () => {
              handleClose();
              await deleteInvite({ variables: { input: { id: invite.id } } });
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default InviteCard;
