import { ILoginResponse } from "../interfaces";

export const fetchLogin = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
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

    const obj: ILoginResponse = await response.json();

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
