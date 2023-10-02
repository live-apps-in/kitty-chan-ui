export enum TemplateType {
  PLAIN = 'plain',
  EMBED = 'embed',
}

export enum Target {
  WELCOME = 'welcome',
  FAREWELL = 'farewell',
}

export interface PlainTemplateDto {
  _id: string;
  name: string;
  type: TemplateType;
  target: Target;
  content: string;
  guildId: string;
  userId: string;
  community: boolean;
  forkedFrom: null;
  __v: number;
}

export type EmbedDto = {
  title: string;
  description: string;
  url: string;
  color: number;
  fields: Array<{
    name: string;
    value: string;
    inline: boolean;
  }>;
  image: {
    url: string;
  };
  timestamp: string;
  thumbnail: {
    url: string;
  };
  author: {
    name: string;
    url: string;
    icon_url: string;
  };
  footer: {
    text: string;
    icon_url: string;
  };
};
export interface EmbedTemplateDto {
  _id: string;
  name: string;
  type: string;
  target: string;
  embed: EmbedDto;
  guildId: string;
  userId: string;
  community: boolean;
  forkedFrom: null;
  __v: number;
}
