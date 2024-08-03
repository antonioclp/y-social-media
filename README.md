<p align="center">
  <img src="./front-end/public/icons/y-purple.webp" width="200">
</p>

<h3 align="center">Y Social Media</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/antonioclp/y-social-mediay)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/antonioclp/y-social-media.svg)](https://github.com/antonioclp/y-social-media)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

> [!NOTE]\
> Project that acts as a social media.

### Usage

```bash
git clone git@github.com:antonioclp/y-social-media.git

cd y-social-media
```

#### Front-end

> Node version 16 or higher.

```bash
npm run front
```

#### Back-end

> Use docker and docker-compose.

```bash
npm run back
```

---

### Users route

| Route                    | Usage                                         |
| ------------------------ | --------------------------------------------- |
| **POST: /register/user** | @RequestBody register a user with a json body |
| **POST: /login/user**    | @RequestBody login with a json body           |
| **GET: /users**          | get all users                                 |
| **PUT: /updadte/user**   | update user with a json body                  |
| **DELETE: /delete/user** | delete a user that want to be delete          |

### Posts route

| Route                      | Usage                                  |
| -------------------------- | -------------------------------------- |
| **POST: /create/post**     | @RequestBody create a new post by user |
| **GET: /posts**            | get all posts                          |
| **GET: /posts/{nickname}** | get posts by user nickname             |

### Comments route

| Route                      | Usage                                  |
| -------------------------- | -------------------------------------- |
| **POST: /create/comment**     | @RequestBody create a new coment by user |
| **GET: /comments/post/{id}**            | get all comments in post by id                          |


---

### Types

> This project have types in `/front-end/src/app/utils`

```bash
utils/
|-interfaces/
|-types/
```

**`types/`**

```ts
export type FetchOption =
  | "create-post"
  | "read-user-posts"
  | "read-all-posts"
  | "read-comments-by-post"
  | "create-comment"
export type Endpoints =
  | "create/post"
  | `posts/${string}`
  | "posts"
  | `comments/post/${string}`
  | `create/comment`;
```

**`interfaces/`**

```ts
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

```
