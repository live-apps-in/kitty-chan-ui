import Link from "next/link";
import { Button } from "./ui/button";
import { Wand2 } from "lucide-react";

type Event = {
  name: string;
  path: string;
  icon: any;
  description: string;
};

type EventsListProps = {
  events: Event[];
  guildId: string | string[];
  feature: string;
};

const EventsList = ({ events, guildId, feature }: EventsListProps) => {
  return (
    <ul className="flex flex-wrap gap-4 h-full pb-4">
      {events.map(({ name, path, icon: Icon, description }) => (
        <Link key={path} href={`/dashboard/${guildId}/${feature}/${path}`}>
          <li
            key={path}
            className="p-4 shadow-md shadow-purple-400 bg-[#0e0e0e]  rounded-2xl group w-full md:w-60 h-full hover:shadow-purple-300"
          >
            <Icon className="text-purple-300 mb-2" size={35} />
            <h2 className="font-semibold capitalize text-lg mb-1">{name}</h2>
            <p className="text-sm mb-4 text-muted-foreground group-hover:text-white transition-all ease-in-out duration-300">
              {description}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default EventsList;
