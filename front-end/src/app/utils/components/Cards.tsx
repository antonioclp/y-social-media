import Image from "next/image";
import { ChangeEvent } from "react";
import moment from "moment";

// Interfaces
import { IGetPosts } from "../interfaces";

// Styles
import "@/styles/components/cards.css";

export const CardFetchPost = ({
  onChange,
  onClick,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
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
          style={{ width: "600px", boxSizing: "border-box" }}
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
  postId,
  message,
  createdDate,
  createdTime,
  user,
  onClick,
}: IGetPosts & {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}) => {
  const formattedDate = moment(createdDate).format("YYYY MM DD");
  const createdDateTime = `${createdDate} ${createdTime}`;
  const relativeTime = moment(createdDateTime).fromNow();

  return (
    <article id={postId.toString()} className="section--2_artcl">
      <section>
        <span>{user.nickname}</span>
      </section>
      <section className="section--2_artcl_message">
        <span>{message}</span>
      </section>
      <section className="section--2_artcl_time">
        <span>{formattedDate}</span>
        <Image
          src="/icons/comment-icon.png"
          alt="comments"
          width={20}
          height={20}
          onClick={onClick}
        />
        <span>{relativeTime}</span>
      </section>
    </article>
  );
};
