"use client";
import EmbedBuilder from "@/components/template-builders/embed-builder/EmbedBuilder";
import { useParams } from "next/navigation";

const AddEmbedTemplatePage = () => {
  const { guildId, target } = useParams();

  return (
    <EmbedBuilder target={target} currentGuildId={guildId} feature="logger" />
  );
};

export default AddEmbedTemplatePage;
