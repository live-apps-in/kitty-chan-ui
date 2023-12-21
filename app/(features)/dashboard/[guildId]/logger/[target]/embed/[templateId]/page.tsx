"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import EmbedBuilder from "@/components/template-builders/embed-builder/EmbedBuilder";

const EditEmbedTemplatePage = () => {
  const { templateId, target, guildId } = useParams();
  const [template, setTemplate] = useState<any>();

  async function fetchTemplate() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${templateId}/view`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "x-guild-id": guildId,
          },
        }
      );

      setTemplate(data);
    } catch (error) {
      console.log("Fetch logger Template Error: ", error);
    }
  }

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  return (
    template && (
      <EmbedBuilder
        target={target}
        templateToEdit={template}
        feature="logger"
        currentGuildId={guildId}
      />
    )
  );
};
export default EditEmbedTemplatePage;
