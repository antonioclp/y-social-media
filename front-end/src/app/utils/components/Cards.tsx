import { ChangeEvent } from "react";

// Interfaces
import { IPostsFetch } from "../interfaces";

export const CardFetchPost = ({
  onChange,
  onClick,
  disable,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  disable: boolean;
}) => {
  return (
    <article>
      <section>
        <input
          type="text"
          placeholder="What's you thinking?"
          max={250}
          onChange={onChange}
        />
      </section>
      <section>
        <button type="button" onClick={onClick} disabled={disable}>
          Send
        </button>
      </section>
    </article>
  );
};

export const CardFetchUsersPost = ({
  message,
  createdDate,
  createdTime,
  user,
}: IPostsFetch) => {
  return (
    <article>
      <section>
        <span>{user.nickname}</span>
      </section>
      <section>
        <p>{message}</p>
      </section>
      <section>
        <span>{createdDate}</span>
        <span>{createdTime}</span>
      </section>
    </article>
  );
};
