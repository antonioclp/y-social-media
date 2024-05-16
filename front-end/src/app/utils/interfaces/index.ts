export interface IUser {
  email: string;
  password: string;
  nickname: string;
  username: string;
}

export interface IGenericResponse {
  message: string;
  status: number;
  data: IUser | null;
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
