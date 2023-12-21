"use client";
import { PlainTemplateDto, TemplateType } from "@/types/template-builders";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

interface PlainMessageProps {
  target: string | string[];
  templateToEdit?: PlainTemplateDto;
  feature: string;
  currentGuildId: string | string[];
}

const FormSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  message: z.string().min(1, "Message is required!"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const PlainMessageBuilder = ({
  target,
  templateToEdit,
  feature,
  currentGuildId,
}: PlainMessageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: templateToEdit?.name || "",
      message: templateToEdit?.content || "",
    },
  });

  const message = watch("message");

  const router = useRouter();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const templateData = {
      name: data.name,
      type: TemplateType.PLAIN,
      target, // Greet->farewell or welcome // Logger->messageUpdate or messageDelete etc..
      content: data.message,
    };

    if (templateToEdit) {
      // Update Template
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
        console.log("Plain Template Update Error: ", error);
      }
    } else {
      // Create Template
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
          reset();
          router.push(`/dashboard/${currentGuildId}/${feature}/${target}`);
        }
      } catch (error) {
        console.log("Plain Template Create Error: ", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 min-h-screen place-items-start gap-10 md:grid-cols-2">
      {/*Input Field Container  */}
      <div className="order-2 rounded-xl w-full bg-neutral-900 px-6 py-10 md:order-1">
        <h2 className="text-md text-white font-semibold text-lg mb-4">
          Plain Message Template
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              placeholder="Enter template name"
              type="text"
              className="form-input-field w-full"
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <textarea
              placeholder="Your message here..."
              className="form-input-field w-full"
              rows={3}
              cols={50}
              {...register("message")}
            />{" "}
            {errors?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button disabled={isSubmitting} className="mt-4 float-right">
            {" "}
            {templateToEdit ? "Update Template" : "Create Template"}
          </Button>
        </form>
      </div>

      {/* Preview Container */}
      <div className="top-0 order-1 w-full bg-neutral-900 p-4 md:sticky md:order-2 rounded-xl">
        <div className="mb-4 flex items-center gap-2">
          <Image
            src="/assets/images/discord-logo.svg"
            alt="Discord logo"
            width={200}
            height={200}
            className="h-10 w-10 object-contain"
          />
          <h2 className="font-semibold text-white">Template Preview</h2>
        </div>

        <div className="relative flex h-auto w-full items-start gap-2 rounded-md bg-neutral-950 px-4 py-4 shadow-xl">
          <Image
            className="h-12 w-auto rounded-full"
            src="/assets/images/kitty-chan-logo.jpg"
            alt="kitty chan logo"
            width={500}
            height={500}
          />
          <div className="w-full mt-[1px]">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#a87ed9]">
                kitty chan
              </h2>
              <span className="rounded-sm bg-[#5b65ea] px-[4px] py-[2px] text-[10px] font-semibold  tracking-tighter text-white">
                BOT{" "}
              </span>
            </div>
            <p className="text-white text-sm break-words w-[88%]">
              {message || "Your message here..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlainMessageBuilder;
