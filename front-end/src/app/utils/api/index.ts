import { IFetchLogin, IUser } from "../interfaces";

export const fetchLogin = async (email: string): Promise<IUser | []> => {
  try {
    const url = `http://localhost:8080/users/${email}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
    });

    const obj: IFetchLogin = await response.json();

    if (obj.status == 404) {
      throw new Error("error: " + obj.message);
    }

    return obj.data;
  } catch (err: any) {
    console.error(err);
    return [];
  }
};
