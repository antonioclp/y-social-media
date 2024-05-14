export interface IUser {
  email: string;
  password: string;
  nickname: string;
  username: string;
}

export interface ILoginResponse {
  message: string;
  status: number;
  data: IUser | null;
}
