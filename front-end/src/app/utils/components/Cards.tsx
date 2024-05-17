import { ChangeEvent } from "react";

// Interfaces
import { IPostsFetch } from "../interfaces";
import Image from "next/image";

export const CardFetchPost = ({
  onChange,
  onClick,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
}) => {
  return (
    <article className="section--1_artcl">
      <section>
        <textarea
          placeholder="What's you thinking?"
          maxLength={250}
          onChange={onChange}
          rows={2}
          cols={20}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </section>
      <section>
        <Image
          src="/icons/arrow-message.png"
          alt="send-message"
          height={20}
          width={20}
          onClick={onClick}
        />
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
