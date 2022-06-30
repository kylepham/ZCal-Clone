import { Invite } from "../graphql/generated/types";
import InviteCard from "./InviteCard";

interface InviteSectionProps {
  invites?: Invite[];
}

const InviteSection = ({ invites }: InviteSectionProps) => {
  return (
    <div className="w-full">
      <p>Invites</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-wrap">
        {!!!invites || invites.length === 0 ? (
          <p className="text-sm text-gray-400">You don&apos;t have any invites yet. Please create one!</p>
        ) : (
          invites.map((invite) => {
            return <InviteCard key={invite.id} invite={invite} />;
          })
        )}
      </div>
    </div>
  );
};

export default InviteSection;
