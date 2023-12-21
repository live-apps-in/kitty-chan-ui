"use client";
import { icons } from "lucide-react";
import { useParams } from "next/navigation";
import EventsList from "@/components/events-list";

const messages = [
  {
    name: "Message Update",
    path: "messageUpdate",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
  {
    name: "Message Delete",
    path: "messageDelete",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
];

const members = [
  {
    name: "Member Add Role",
    path: "memberAddRole",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
  {
    name: "Member Remove Role",
    path: "memberRemoveRole",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
  {
    name: "Member Nickname Update",
    path: "memberNicknameUpdate",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
  {
    name: "Member Username Update",
    path: "memberUsernameUpdate",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
  {
    name: "Member Avatar Update",
    path: "memberAvatarUpdate",
    icon: icons["MessageSquare"],
    description:
      "When user edits an message in server.The edited message can be resent with our kitty bot!",
  },
];

const LoggerPage = () => {
  const { guildId } = useParams();
  return (
    <div>
      <h2 className="heading w-44 pb-6">
        Logger
      </h2>
      {/* Messages */}
      <div className="space-y-2 mb-8">
        <h4 className="text-lg font-semibold">Messages</h4>
        <EventsList events={messages} guildId={guildId} feature="logger" />
      </div>

      {/* Members */}
      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Members</h4>
        <EventsList events={members} guildId={guildId} feature="logger" />
      </div>
    </div>
  );
};

export default LoggerPage;
