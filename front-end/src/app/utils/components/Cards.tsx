import { ChangeEvent } from "react";

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

export const CardFetchUsersPost = () => {
  return (
    <article>
      <section>CardFetchUsersPost</section>
    </article>
  );
};
