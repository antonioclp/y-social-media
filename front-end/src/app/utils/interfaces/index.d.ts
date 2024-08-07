import { Endpoints, FetchOption } from "../types";

export interface IUser {
  userId?: number;
  email?: string;
  password?: string;
  nickname?: string;
  username?: string;
  bio?: string;
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

export interface IPostsFetch {
  message: string;
  createdDate: string;
  createdTime: string;
  user: IUser;
}

export interface IGetPosts {
  postId: number;
  message: string;
  createdDate: string;
  createdTime: string;
  user: IUser;
}

export interface IUpdate {
  email: string;
  password: string;
  username?: string;
  nickname?: string;
  bio?: string;
}

export interface IGetComments {
  commentId: number;
  message: string;
  createdDate: string;
  createdTime: string;
  postId: number;
  user: IUser;
}

export interface IGenericResponse {
  message: string;
  status: number;
  data: IUser | IPostsFetch | IGetPosts | IGetComments | null;
}

export interface IComment {
  message: string;
  createdDate: string;
  createdTime: string;
  user: {
    userId: number;
  };
  post: {
    postId: number;
  };
}
