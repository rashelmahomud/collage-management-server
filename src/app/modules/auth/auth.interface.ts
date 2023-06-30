export type IUserLogin = {
  id: string;
  password: string;
};

export type ILoginUserResponce = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
