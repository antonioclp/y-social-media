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
