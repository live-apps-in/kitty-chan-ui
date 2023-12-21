type DiscordActivity = {
  name: string;
  type: 0; // Assuming type 0 corresponds to "playing" in Discord
  details: string;
  createdTimestamp: string; // You may want to change the type based on your actual use case
};

export type DiscordUserDto = {
  name: string;
  discord: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    banner: null | string;
    accent_color: number;
    global_name: string;
    banner_color: string;
  };
  activities: DiscordActivity[];
  activityStatus: "online" | "offline" | "idle" | "dnd" | "invisible";
};
