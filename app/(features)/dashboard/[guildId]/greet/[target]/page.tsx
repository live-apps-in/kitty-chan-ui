"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { EmbedTemplateDto, PlainTemplateDto } from "@/types/template-builders";
import { Badge } from "@/components/ui/badge";
import {
  Edit2,
  LucideEye,
  MoreVertical,
  MousePointerClick,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateTemplateDialog from "@/components/create-template";
import { ChannelDto } from "@/types/channel";
import { Separator } from "@/components/ui/separator";
import ToggleButton from "@/components/ToggleButton";
import { GreetDto } from "@/types/features/greet";
import { icons } from "lucide-react";

const greetEvents = [
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
const GreetTargetPage = () => {
  const { target, guildId } = useParams();

  const [greet, setGreet] = useState<GreetDto>();

  const [templates, setTemplates] =
    useState<Array<PlainTemplateDto & EmbedTemplateDto>>();
  const [channels, setChannels] = useState<ChannelDto[]>();
  const [activeTemplateId, setActiveTemplateId] = useState("");
  const [activeChannel, setActiveChannel] = useState<ChannelDto>();
  const [isEnabled, setIsEnabled] = useState(false);

  async function fetchChannels(): Promise<ChannelDto[]> {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/channels`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(`Error fetching channels: ${error}`);
      throw error;
    }
  }

  async function fetchTemplates(): Promise<
    Array<PlainTemplateDto & EmbedTemplateDto>
  > {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${target}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(`Error fetching templates: ${error}`);
      throw error;
    }
  }

  async function fetchGreet(): Promise<GreetDto> {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );

      const newData = {
        isActive:
          data.isActive === true || data.isActive === false
            ? data.isActive
            : false,
        welcome: {
          isActive:
            data.welcome?.isActive === true || data.welcome?.isActive === false
              ? data.welcome?.isActive
              : false,
          channelId: data.welcome?.channelId || null,
          templateId: data.welcome?.templateId || null,
        },
        farewell: {
          isActive:
            data.farewell?.isActive === true ||
            data.farewell?.isActive === false
              ? data.farewell?.isActive
              : false,
          channelId: data.farewell?.channelId || null,
          templateId: data.farewell?.templateId || null,
        },
      };

      return newData;
    } catch (error) {
      console.log(`Error fetching greet details: ${error}`);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [greetData, templatesData, channelsData] = await Promise.all([
          fetchGreet(),
          fetchTemplates(),
          fetchChannels(),
        ]);

        // Use the fetched data
        setGreet(greetData);
        setTemplates(templatesData);
        setChannels(channelsData);

        // Get in-use template Id
        const templateId = (greetData as any)[target as string]?.templateId;
        setActiveTemplateId(templateId);

        // Set active channel
        setActiveChannel(
          channelsData?.find(
            (channel: ChannelDto) =>
              (greetData as any)[target as string]?.channelId === channel.id
          )
        );

        // Set isActive Toggle
        setIsEnabled((greetData as any)?.[target as string].isActive);

        console.log("All fetches successful");
      } catch (error) {
        console.log("Error in one or more fetch operations:", error);
      }
    };

    fetchData();
  }, []);

  // Actions
  async function handleApplyTemplate(templateId: string) {
    try {
      if (!activeChannel) {
        window.alert("Choose the channel first");
        return;
      }

      const greetData = {
        ...greet,
        [target as string]: {
          isActive: true,
          channelId: activeChannel.id,
          templateId,
        },
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        greetData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );

      setActiveTemplateId(templateId);
    } catch (error) {
      console.log(`Error applying template: ${error}`);
    }
  }

  async function handleDeleteTemplate(templateId: string) {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );

      const updatedTemplates = templates?.filter(
        (template) => template._id !== templateId
      );
      setTemplates(updatedTemplates);
    } catch (error) {
      console.log(`Error deleting template: ${error}`);
    }
  }

  async function handleChannelSelect(channelId: string) {
    try {
      const greetData = {
        ...greet,
        [target as string]: {
          isActive: true,
          channelId: channelId,
          templateId: activeTemplateId || null,
        },
      };

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        greetData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );

      setActiveChannel(
        channels?.find(
          (channel: ChannelDto) =>
            (data as any)[target as string]?.channelId === channel.id
        )
      );
    } catch (error) {
      console.log(`Error Selecting Channel: ${error}`);
    }
  }

  async function toggleIsActive(isActive: boolean) {
    try {
      const greetData = {
        ...greet,
        [target as any]: {
          ...(greet as any)[target as string],
          isActive,
        },
      };

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/greet`,
        greetData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );

      setIsEnabled(data?.[target as string].isActive);
    } catch (error) {
      console.log(`Error Toggling isActive: ${error}`);
    }
  }

  console.log(templates);
  console.log(greet);
  console.log(activeTemplateId);
  console.log(channels);
  console.log(activeChannel);
  console.log(isEnabled);

  return (
    <div>
      <header className="flex items-center justify-between">
        {/* greet Type Heading */}
        <h2 className="text-2xl mb-4">
          {greetEvents.map(({ path, name }) => path === target && name)}
        </h2>
        <div className="flex items-center gap-6">
          {greet && (
            <div className="flex items-center gap-2">
              <ToggleButton
                enabled={isEnabled}
                setEnabled={setIsEnabled}
                updateData={toggleIsActive}
              />
              <p>
                {isEnabled ? <Badge>Enabled</Badge> : <Badge>Disabled</Badge>}
              </p>
            </div>
          )}
          {/* Create Template Dialog */}
          <CreateTemplateDialog
            guildId={guildId}
            feature="greet"
            target={target}
          />
        </div>
      </header>

      {/* Channels Section */}
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-semibold text-purple-200">
          Channel info
        </h2>
        {activeChannel && (
          <div className="mb-4">
            <span className="text-sm font-semibold">Active channel: </span>
            <Badge className="capitalize bg-purple-900 text-purple-200 hover:bg-purple-800">
              {activeChannel?.name}
            </Badge>
          </div>
        )}

        <div>
          <p className="text-sm mb-2">
            Choose a channel in which the kitty bot can send greet!
          </p>
        </div>

        <Select
          onValueChange={(channelId) => handleChannelSelect(channelId)}
          value={activeChannel?.id}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={`${
                activeChannel ? "Select other Channel" : "Choose a Channel"
              }`}
            />
          </SelectTrigger>
          <SelectContent>
            {channels?.map((channel) => (
              <SelectItem key={channel.id} value={channel.id}>
                <p className="capitalize">{channel.name}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/*Templates Container  */}
      {templates?.length === 0 ? (
        <h2>You have no templates to show. Create one</h2>
      ) : (
        <main>
          {/* Current Template Container */}
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-semibold text-purple-200">
              Templates
            </h2>
            <ul>
              {templates?.map((template) => {
                if (template._id === activeTemplateId)
                  return (
                    <li
                      key={template._id}
                      className="px-6 py-4 shadow-md bg-[#0e0e0e] rounded-lg  lg:w-[60%] 2xl:w-[75%]"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="font-semibold capitalize text-xl bg-gradient-to-r from-purple-300 via-purple-200  to-purple-300  bg-clip-text text-transparent">
                          {template.name}
                        </h2>

                        <div>
                          <Badge variant="default">{template.type}</Badge>
                          <Badge
                            variant="default"
                            className="ml-2 bg-violet-300"
                          >
                            In use
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="ml-auto flex items-center gap-2">
                          {/* Preview */}
                          <LucideEye />

                          {/* Actions */}
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <div className="hover:bg-gray-700 rounded-full p-1 transition-all duration-300 ease-in-out active:scale-75">
                                <MoreVertical className="cursor-pointer" />
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <Link
                                href={`/dashboard/${guildId}/greet/${target}/${template.type}/${template._id}`}
                              >
                                <DropdownMenuItem>
                                  <Edit2 className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                              </Link>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Image
                          className="h-11 w-auto rounded-full mt-1"
                          src="/assets/images/kitty-chan-logo.jpg"
                          alt="kitty chan logo"
                          width={500}
                          height={500}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm  tracking-wider text-purple-300">
                              kitty chan
                            </h2>
                            <span className="rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-tighter text-white">
                              BOT
                            </span>
                          </div>
                          <p>
                            {template.content || template.embed.title || ""}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
              })}
            </ul>
          </div>

          {/* Other Templates Container */}
          <div className="mb-4">
            <Separator className="mb-4 bg-black lg:w-[60%] 2xl:w-[75%]" />
            <ul className="space-y-4">
              {templates?.map((template) => {
                if (template._id !== activeTemplateId)
                  return (
                    <li
                      key={template._id}
                      className="px-6 py-4 shadow-md bg-[#0e0e0e] rounded-lg lg:w-[60%] 2xl:w-[75%]"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="font-semibold capitalize text-xl bg-gradient-to-r from-purple-300 via-purple-200  to-purple-300  bg-clip-text text-transparent">
                          {template.name}
                        </h2>

                        <div>
                          <Badge variant="default">{template.type}</Badge>
                        </div>

                        {/* Actions */}
                        <div className="ml-auto flex items-center gap-2">
                          {/* Preview */}
                          <LucideEye />

                          {/* Actions */}
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <div className="hover:bg-gray-700 rounded-full p-1 transition-all duration-300 ease-in-out active:scale-75">
                                <MoreVertical className="cursor-pointer" />
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleApplyTemplate(template._id)
                                }
                              >
                                <MousePointerClick className="mr-2 h-4 w-4" />
                                <span>Use this template</span>
                              </DropdownMenuItem>

                              <Link
                                href={`/dashboard/${guildId}/greet/${target}/${template.type}/${template._id}`}
                              >
                                <DropdownMenuItem>
                                  <Edit2 className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                              </Link>

                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteTemplate(template._id)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Image
                          className="h-11 w-auto rounded-full mt-1"
                          src="/assets/images/kitty-chan-logo.jpg"
                          alt="kitty chan logo"
                          width={500}
                          height={500}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm  tracking-wider text-purple-300">
                              kitty chan
                            </h2>
                            <span className="rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px]  tracking-tighter text-white">
                              BOT
                            </span>
                          </div>
                          <p>
                            {template.content ||
                              template.embed.title ||
                              "No content!"}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
              })}
            </ul>
          </div>
        </main>
      )}
    </div>
  );
};

export default GreetTargetPage;
