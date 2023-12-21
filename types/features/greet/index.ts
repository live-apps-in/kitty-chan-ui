export interface GreetDto {
  isActive: boolean;
  welcome: {
    isActive: boolean;
    channelId: string | null;
    templateId: string | null;
  };
  farewell: {
    isActive: boolean;
    channelId: string | null;
    templateId: string | null;
  };
}
