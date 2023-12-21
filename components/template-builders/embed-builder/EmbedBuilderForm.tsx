import InputField from "@/components/widgets/InputField";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { motion } from "framer-motion";
import { EmbedTemplateDto, TemplateType } from "@/types/template-builders";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { filterEmptyFields, hexToRgb } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EmbedBuilderFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  tumbnailURL: string;
  setTumbnailURL: React.Dispatch<React.SetStateAction<string>>;
  fields: Array<{ name: string; value: string; inline: boolean }>;
  setFields: React.Dispatch<React.SetStateAction<any>>;
  embedURL: string;
  setEmbedURL: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  timestamp: string;
  setTimestamp: React.Dispatch<React.SetStateAction<string>>;
  authorName: string;
  setAuthorName: React.Dispatch<React.SetStateAction<string>>;
  authorURL: string;
  setAuthorURL: React.Dispatch<React.SetStateAction<string>>;
  authorIconURL: string;
  setAuthorIconURL: React.Dispatch<React.SetStateAction<string>>;
  footerText: string;
  setFooterText: React.Dispatch<React.SetStateAction<string>>;
  footerIconURL: string;
  setFooterIconURL: React.Dispatch<React.SetStateAction<string>>;
  target: string | string[];
  templateToEdit?: EmbedTemplateDto;
  feature: string;
  currentGuildId: string | string[];
}

const EmbedBuilderForm = ({
  title,
  setTitle,
  description,
  setDescription,
  color,
  setColor,
  tumbnailURL,
  setTumbnailURL,
  fields,
  setFields,
  embedURL,
  setEmbedURL,
  image,
  setImage,
  timestamp,
  setTimestamp,
  authorName,
  setAuthorName,
  authorURL,
  setAuthorURL,
  authorIconURL,
  setAuthorIconURL,
  footerText,
  setFooterText,
  footerIconURL,
  setFooterIconURL,
  target,
  templateToEdit,
  feature,
  currentGuildId,
}: EmbedBuilderFormProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [templateName, setTemplateName] = useState(templateToEdit?.name || "");
  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  const router = useRouter();

  const handleFieldChange = (
    index: number,
    fieldKey: string,
    value: string
  ) => {
    const updatedFields: any = [...fields];
    updatedFields[index][fieldKey] = value;
    setFields(updatedFields);
  };

  const handleAddField = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFields([...fields, { name: "", value: "", inline: true }]);
  };

  const handleRemoveField = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { current } = textareaRef;
      if (current) {
        const { selectionStart, selectionEnd } = current;
        const newContent =
          description.substring(0, selectionStart) +
          "\n" +
          description.substring(selectionEnd);
        setDescription(newContent);
        current.selectionStart = selectionEnd + 1;
        current.selectionEnd = selectionEnd + 1;
      }
    }
  };

  const handleInlineChange = (index: number, value: boolean) => {
    const updatedFields = [...fields];
    updatedFields[index].inline = value;
    setFields(updatedFields);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const embedData = {
      title,
      description,
      url: embedURL,
      color: hexToRgb(color),
      fields,
      image: {
        url: image,
      },
      timestamp,
      thumbnail: {
        url: tumbnailURL,
      },
      author: {
        name: authorName,
        url: authorURL,
        icon_url: authorIconURL,
      },
      footer: {
        text: footerText,
        icon_url: footerIconURL,
      },
    };

    const templateData = {
      name: templateToEdit ? templateToEdit.name : templateName,
      type: TemplateType.EMBED,
      target, // welcome,farwell,messageUpdate,messageDelete...
      // Remove keys that dont have any value
      embed: filterEmptyFields(embedData),
    };

    if (templateToEdit) {
      // Update Embed Template
      try {
        const { status } = await axios.patch(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${templateToEdit._id}`,
          templateData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
              "x-guild-id": currentGuildId,
            },
          }
        );
        if (status === 200) {
          router.push(`/dashboard/${currentGuildId}/${feature}/${target}`);
        }
      } catch (error) {
        console.log("Embed Template Update Error: ", error);
      }
    } else {
      // Create Embed Template
      try {
        const { status } = await axios.post(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template`,
          templateData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
              "x-guild-id": currentGuildId,
            },
          }
        );
        if (status === 201) {
          router.push(`/dashboard/${currentGuildId}/${feature}/${target}`);
        }
      } catch (error) {
        console.log("Embed Template Create Error: ", error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative p-4 rounded-xl">
      <div className="shrink-0 space-y-6 text-primary-foreground">
        <InputField
          placeholder="Enter template name"
          value={templateName}
          onChange={setTemplateName}
          label="Template name"
        />

        <InputField
          label="Embed title"
          placeholder="Enter embed title"
          value={title}
          onChange={setTitle}
        />

        <div>
          <label className="text-white text-sm font-semibold">
            Embed description
          </label>
          <textarea
            ref={textareaRef}
            placeholder="Enter embed Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-input-field w-full mt-2 placeholder:text-xs"
            rows={3}
            cols={50}
          />
        </div>

        <InputField
          label="Embed url"
          placeholder="Enter embed Url"
          value={embedURL}
          onChange={setEmbedURL}
        />

        <div>
          <label className="text-white text-sm font-semibold">Color</label>
          <div className="relative flex items-center gap-4">
            <div
              className="flex cursor-pointer items-center justify-center rounded-md"
              onClick={() => setDisplayColorPicker(!displayColorPicker)}
            >
              <img
                src="/assets/icons/color-palette.svg"
                alt="Color Palette"
                className="h-8 w-8 mt-2"
              />
            </div>

            <InputField
              placeholder="#000000"
              value={color}
              onChange={setColor}
              className="w-full"
            />

            {displayColorPicker && (
              <div className="absolute top-12 z-10">
                <div
                  className="fixed inset-0 cursor-pointer"
                  onClick={() => setDisplayColorPicker(false)}
                ></div>
                <SketchPicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>

        <Accordion type="multiple" className="w-full text-white">
          <AccordionItem value="fields">
            <AccordionTrigger>Fields</AccordionTrigger>
            <AccordionContent>
              <div className="py-2 text-white">
                <h2 className="mb-2 text-sm font-semibold tracking-wide">
                  Fields
                </h2>
                <ul className="space-y-6">
                  {fields.map((field, index) => (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      exit={{ opacity: 0 }}
                      key={index}
                      className="relative flex flex-col gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Name of the embed field"
                        className="form-input-field w-[75%] placeholder:text-xs"
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(index, "name", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Value of the embed field"
                        className="form-input-field w-[75%] placeholder:text-xs"
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(index, "value", e.target.value)
                        }
                      />

                      <div className="ml-1">
                        <input
                          type="checkbox"
                          checked={field.inline}
                          onChange={(e) =>
                            handleInlineChange(index, e.target.checked)
                          }
                          className="h-4 w-4 cursor-pointer rounded  focus:ring-0"
                        />
                        <label className="ml-2 text-sm font-medium text-white">
                          Inline
                        </label>
                      </div>

                      <button
                        className="absolute right-6 top-1 flex items-center gap-1 md:right-4 lg:right-12 2xl:right-16"
                        onClick={(e) => handleRemoveField(e, index)}
                      >
                        <AiOutlineCloseCircle
                          size={20}
                          className="text-red-500"
                        />
                        <p className="-mt-1 text-xs">Close</p>
                      </button>
                    </motion.li>
                  ))}
                </ul>
                <button
                  onClick={handleAddField}
                  className="mt-6 flex cursor-pointer items-center gap-2 transition active:scale-90"
                >
                  <CiCirclePlus size={22} />
                  <p className="text-sm">Add Field</p>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="timestamp">
            <AccordionTrigger>Timestamp</AccordionTrigger>
            <AccordionContent>
              <InputField
                placeholder="Timestamp for the embed"
                value={timestamp}
                onChange={setTimestamp}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="image">
            <AccordionTrigger>Image</AccordionTrigger>
            <AccordionContent>
              <InputField
                label="url"
                value={image}
                onChange={setImage}
                placeholder="Source url of image"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="thumbnail">
            <AccordionTrigger>Thumbnail</AccordionTrigger>
            <AccordionContent>
              <InputField
                label="url"
                value={tumbnailURL}
                onChange={setTumbnailURL}
                placeholder="Source url of image"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="author">
            <AccordionTrigger>Author</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <InputField
                  label="name"
                  placeholder="Name of the author"
                  value={authorName}
                  onChange={setAuthorName}
                />
                <InputField
                  label="url"
                  placeholder="url of the author"
                  value={authorURL}
                  onChange={setAuthorURL}
                />
                <InputField
                  label="icon_url"
                  placeholder="url of author icon"
                  value={authorIconURL}
                  onChange={setAuthorIconURL}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="footer">
            <AccordionTrigger>Footer</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 ">
                <InputField
                  label="Text"
                  placeholder="footer text"
                  value={footerText}
                  onChange={setFooterText}
                />
                <InputField
                  label="icon_url"
                  placeholder="Source url of image"
                  value={footerIconURL}
                  onChange={setFooterIconURL}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Button className="mt-6 float-right">
        {templateToEdit ? "Update Template" : "Create Template"}
      </Button>
    </form>
  );
};

export default EmbedBuilderForm;
