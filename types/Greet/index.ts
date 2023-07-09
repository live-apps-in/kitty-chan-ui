export enum TemplateType {
  PLAIN = 'plain',
  EMBED = 'embed',
}

export enum Target {
  WELCOME = 'welcome',
  FAREWELL = 'farewell',
}

export interface GreetDto {
  isActive: boolean;
  welcome: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  farewell: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
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
}
