export type SignUpRequest = {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SocialSignUpRequest = {
  token: string;
  redirectUri: string;
  nickname: string;
};

export type SocialSignInRequest = {
  token: string;
  redirectUri: string;
};

export type User = {
  id: number;
  nickname: string;
  description: string;
  image: null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  email: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};
