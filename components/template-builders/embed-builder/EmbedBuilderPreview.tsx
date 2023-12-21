/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface EmbedBuilderPreviewProps {
  title: string;
  description: string;
  color: string;
  tumbnailURL: string;
  fields: Array<{ name: string; value: string; inline: boolean }>;
  embedURL: string;
  image: string;
  timestamp: string;
  authorName: string;
  authorURL: string;
  authorIconURL: string;
  footerText: string;
  footerIconURL: string;
}

const EmbedBuilderPreview = ({
  title,
  description,
  color,
  tumbnailURL,
  fields,
  image,
  embedURL,
  timestamp,
  authorName,
  authorURL,
  authorIconURL,
  footerText,
  footerIconURL,
}: EmbedBuilderPreviewProps) => {
  return (
    <div className="bg-neutral-900">
      {/* Embed Preview text section */}
      <div className="mb-4 flex items-center gap-4">
        <Image
          src="/assets/images/discord-logo.svg"
          alt="Discord logo"
          width={200}
          height={200}
          className="h-10 w-10 object-contain"
        />
        <h2 className="font-semibold text-white">Preview</h2>
      </div>

      {/* Embed Preview */}
      <div className="relative rounded-md bg-neutral-950 px-5 py-3 text-white">
        {/* Left Border  */}
        <span
          className="absolute left-0 top-0 h-full w-[6px] rounded-l-lg"
          style={{ backgroundColor: color }}
        ></span>

        {/* Author */}
        <h6 className="mb-2 flex items-center gap-2 break-words">
          {authorIconURL && (
            <img
              src={authorIconURL}
              alt=""
              className="h-auto w-10 rounded-full"
            />
          )}
          {authorURL ? (
            <a
              href={authorURL}
              target="_blank"
              className="underline-offset-2 hover:underline"
            >
              {authorName}
            </a>
          ) : (
            authorName
          )}
        </h6>

        {/* Title */}
        <h2 className="mb-1 break-words font-semibold">
          {embedURL ? (
            <a
              href={embedURL}
              target="_blank"
              className="text-[#fce4a8] underline-offset-2 hover:underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <pre className="w-full whitespace-pre-wrap break-words text-sm">
          {description}
        </pre>

        {/* Fields */}
        <ul className="mt-3 overflow-auto">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`${
                (field.name || field.value) && field.inline
                  ? "mr-8 inline-flex"
                  : "block"
              } mb-4`}
            >
              <div>
                <h2 className="mb-1 text-sm font-semibold">{field.name}</h2>
                <p className="text-sm">{field.value}</p>
              </div>
            </div>
          ))}
        </ul>

        {/*Image  */}
        <img src={image} alt="" className="mt-1 h-auto w-64 rounded-md" />

        {/*Tumbnail  */}
        <img
          src={tumbnailURL}
          alt=""
          className="absolute right-4 top-4 h-auto w-14 rounded-md"
        />

        {/* Footer & Timestamp */}
        <div className="mt-1 flex w-full flex-wrap items-center gap-1 overflow-hidden">
          {footerIconURL && (
            <img
              src={footerIconURL}
              alt=""
              className="mr-1 h-auto w-5 rounded-full"
            />
          )}
          <p className="break-words text-xs">{footerText}</p>
          {footerText && timestamp && <p>•</p>}
          <p className="text-xs">{timestamp && "few seconds ago"}</p>
        </div>
      </div>
    </div>
  );
};

export default EmbedBuilderPreview;
