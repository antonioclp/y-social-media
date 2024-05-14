import { IGenericResponse, IRegister } from "../interfaces";

export const fetchLogin = async (
  email: string,
  password: string
): Promise<IGenericResponse> => {
  let status: number = 0;

  try {
    const url = `http://localhost:8080/users/${email}`;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
  usr: IRegister
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
        age: 2024 - Number(birthday.split("-")[0]),
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
