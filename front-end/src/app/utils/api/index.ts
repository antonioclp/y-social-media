import {
  ICreatePostFetch,
  IGenericFetch,
  IGenericResponse,
  IRegisterForm,
} from "../interfaces";

export const fetchLogin = async (
  email: string,
  password: string
): Promise<IGenericResponse> => {
  let status: number = 0;

  try {
    const url = `http://localhost:8080/login/user`;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const obj: IGenericResponse = await response.json();

    if (obj.status !== 200) {
      status = obj.status;
      throw new Error(obj.message);
    }

    return obj;
  } catch (err: any) {
    return {
      message: err,
      status,
      data: null,
    };
  }
};

export const fetchRegister = async (
  usr: IRegisterForm
): Promise<IGenericResponse> => {
  let status: number = 0;

  try {
    const url = "http://localhost:8080/register/user";

    const { email, username, nickname, password, birthday } = usr;

    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        nickname,
        password,
        age: new Date().getFullYear() - Number(birthday.split("-")[0]),
      }),
    });

    const obj: IGenericResponse = await response.json();

    if (obj.status !== 201) {
      status = obj.status;
      throw new Error(obj.message);
    }

    return obj;
  } catch (err: any) {
    return {
      message: err,
      status,
      data: null,
    };
  }
};

export const GenericFetch = async (
  fetchObj: IGenericFetch,
  postObj: ICreatePostFetch
) => {
  let status: number = 0;

  try {
    const { option, endpoint, method } = fetchObj;

    const url = `http://localhost:8080/${endpoint}`;

    switch (option) {
      case "create-post":
        const { message, createdDate, createdTime, user } = postObj;
        const { email } = user;

        const response = await fetch(url, {
          method,
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            createdDate,
            createdTime,
            user: {
              email,
            },
          }),
        });

        const obj: IGenericResponse = await response.json();

        if (obj.status !== 200) {
          status = obj.status;
          throw new Error(obj.message);
        }

        return obj;
      default:
        break;
    }
  } catch (err: any) {
    return {
      message: err,
      status,
      data: null,
    };
  }
};
