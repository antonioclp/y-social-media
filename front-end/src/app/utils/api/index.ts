import {
  IComment,
  IGenericFetch,
  IGenericResponse,
  IPostsFetch,
  IRegisterForm,
  IUpdate,
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

    await new Promise((resolve) => setTimeout(resolve, 3000));

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

export const updateFetch = async (
  updateObj: IUpdate
): Promise<IGenericResponse> => {
  let status = 0;

  try {
    const { email, nickname, password, username, bio } = updateObj;

    const url = `http://localhost:8080/update/user`;

    const res = await fetch(url, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        nickname,
        bio,
      }),
    });

    const obj: IGenericResponse = await res.json();

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

export const genericFetch = async (
  fetchObj: IGenericFetch,
  postObj?: IPostsFetch | null,
  commentObj?: IComment | null,
  nickname?: string
): Promise<IGenericResponse> => {
  let status: number = 0;

  try {
    const { option, endpoint, method } = fetchObj;

    const url = `http://localhost:8080/${endpoint}`;

    if (option === "create-post" && postObj) {
      const { message, createdDate, createdTime, user } = postObj;
      const { email } = user;

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await fetch(url, {
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

      const obj: IGenericResponse = await res.json();

      if (obj.status !== 201) {
        status = obj.status;
        throw new Error(obj.message);
      }

      return obj;
    }

    if (option === "read-all-posts") {
      const response = await fetch(url, {
        method,
        cache: "no-cache",
      });

      const obj: IGenericResponse = await response.json();

      if (obj.status !== 200) {
        status = obj.status;
        throw new Error(obj.message);
      }

      return obj;
    }

    if (option === "read-user-posts") {
      const urlByNickname = `${url + "/" + nickname}`;
      const response = await fetch(urlByNickname, {
        method,
        cache: "no-cache",
      });

      const obj: IGenericResponse = await response.json();

      if (obj.status !== 200) {
        status = obj.status;
        throw new Error(obj.message);
      }

      return obj;
    }

    if (option === "read-comments-by-post") {
      const response = await fetch(url, {
        method,
        cache: "no-cache",
      });

      const obj: IGenericResponse = await response.json();

      if (obj.status !== 200) {
        status = obj.status;
        throw new Error(obj.message);
      }

      return obj;
    }

    if (option === "create-comment" && commentObj) {
      const {
        message,
        createdDate,
        createdTime,
        user: { userId },
        post: { postId },
      } = commentObj;

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
            id: userId,
          },
          post: {
            id: postId,
          },
        }),
      });

      const obj: IGenericResponse = await response.json();

      if (obj.status !== 200) {
        status = obj.status;
        throw new Error(obj.message);
      }

      return obj;
    }

    status = 505;
    throw new Error("no valid option provided.");
  } catch (err: any) {
    return {
      message: err,
      status,
      data: null,
    };
  }
};
