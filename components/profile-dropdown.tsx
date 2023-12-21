import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { DiscordUserDto } from "@/types/user";
import { BadgeInfo, Contact, Home, Layers, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

type ProfileDropdownType = {
  userDetails: DiscordUserDto;
};

const ProfileDropdown = ({ userDetails }: ProfileDropdownType) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white lg:flex">
            {userDetails.discord.global_name}
          </p>
          <Image
            src={`${
              userDetails
                ? `https://cdn.discordapp.com/avatars/${userDetails.discord.id}/${userDetails.discord.avatar}.png`
                : "/assets/images/user-avatar.png"
            } 
`}
            alt="avatar"
            className="h-auto w-12 rounded-full"
            width={500}
            height={500}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{userDetails.discord.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/">
          <DropdownMenuItem>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/servers">
          <DropdownMenuItem>
            <Layers className="mr-2 h-4 w-4" />
            <span>Servers</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <BadgeInfo className="mr-2 h-4 w-4" />
          <span>About Us</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Contact className="mr-2 h-4 w-4" />
          <span>Contact Us</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(logOut());
            window.location.href = "/";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileDropdown;
