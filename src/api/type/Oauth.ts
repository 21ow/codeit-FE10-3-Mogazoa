export type OauthRequest = {
  appKey: string;
  provider: string;
};

export type OauthResponse = {
  id: number;
  provider: string;
  teamId: string;
  appKey: string;
  createdAt: string;
  updatedAt: string;
};
