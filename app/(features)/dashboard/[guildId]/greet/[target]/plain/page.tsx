"use client";
import PlainMessageBuilder from "@/components/template-builders/plain-message-builder/PlainMessageBuilder";
import { useParams } from "next/navigation";

const AddPlainMessageTemplatePage = () => {
  const { guildId, target } = useParams();

  return (
    <PlainMessageBuilder
      target={target}
      currentGuildId={guildId}
      feature="greet"
    />
  );
};

export default AddPlainMessageTemplatePage;
