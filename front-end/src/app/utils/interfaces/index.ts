import { Endpoints, FetchOption } from "../types";

export interface IUser {
  email?: string;
  password?: string;
  nickname?: string;
  username?: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  nickname: string;
  username: string;
  birthday: string;
  confirmPassword: string;
}

export interface IErrors {
  activate: boolean;
  message: string;
}

export interface IGenericFetch {
  option: FetchOption;
  endpoint: Endpoints;
  method: string;
}

export interface ICreatePostFetch {
  message: string;
  createdDate: string;
  createdTime: string;
  user: IUser;
}

export interface IGenericResponse {
  message: string;
  status: number;
  data: IUser | ICreatePostFetch | null;
}
