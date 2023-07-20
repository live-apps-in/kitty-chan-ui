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

export interface LogsDto {
  isActive: boolean;
  messageUpdate: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  messageDelete: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  memberAddRole: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  memberRemoveRole: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  memberNicknameUpdate: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  memberUsernameUpdate: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
  memberAvatarUpdate: {
    isActive: boolean;
    channelId: string;
    templateId: string;
  };
}
