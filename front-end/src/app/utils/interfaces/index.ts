export interface IUser {
  email: string;
  password: string;
  nickname: string;
  username: string;
}

export interface IFetchLogin {
  message: string;
  status: number;
  data: IUser;
}
