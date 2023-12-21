"use client";
import { icons } from "lucide-react";
import { useParams } from "next/navigation";
import EventsList from "@/components/events-list";

export const greetEvents = [
  {
    name: "Welcome",
    path: "welcome",
    icon: icons["MessageSquare"],
    description:
      "When an user joins the server.The welcome message will be sent by our kitty bot!",
  },
  {
    name: "Farewell",
    path: "farewell",
    icon: icons["MessageSquare"],
    description:
      "When an user leaves the server.The farewell message will be sent by our kitty bot!",
  },
];

const GreetPage = () => {
  const { guildId } = useParams();
  return (
    <>
      <h2 className="heading w-40 pb-6">Greet</h2>
      <EventsList events={greetEvents} guildId={guildId} feature="greet" />
    </>
  );
};

export default GreetPage;
