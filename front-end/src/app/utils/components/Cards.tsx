import { ChangeEvent } from "react";

export const CardFetchPost = ({
  onChange,
  onClick,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) => {
  return (
    <article>
      <section>
        <input
          type="text"
          placeholder="What's you thinking?"
          onChange={onChange}
        />
      </section>
      <section>
        <button type="button" onClick={onClick}>
          Send
        </button>
      </section>
    </article>
  );
};

export const CardFetchUsersPost = () => {
  return (
    <article>
      <section>CardFetchUsersPost</section>
    </article>
  );
};
