"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import moment from "moment";

// Components
import { CardFetchPost } from "@/app/utils/components/Cards";

// Interfaces
import {
  IComment,
  IErrors,
  IGenericResponse,
  IGetComments,
} from "@/app/utils/interfaces";

// Api
import { genericFetch } from "@/app/utils/api";

// Styles
import "@/styles/pages/post.css";

export default function Post() {
  const [postComments, setPostComments] = useState<IGetComments[]>([]);
  const [commentMsg, setCommentMsg] = useState<string>("");
  const [errorsMsg, setErrorsMsg] = useState<IErrors>({
    activate: false,
    message: "",
  });
  const urlPostId = usePathname().split("/").pop();

  useEffect(() => {
    try {
      if (!Cookies.get("dXNy")) {
        redirect("/login");
      }

      const fetch = async () => {
        const obj: IGenericResponse = await genericFetch({
          option: "read-comments-by-post",
          method: "GET",
          endpoint: `comments/post/${urlPostId}`,
        });

        const { data }: IGenericResponse = obj;

        if (Array.isArray(data)) {
          const comments: IGetComments[] = data;

          const sortedComments = comments.sort((cA, cB) => {
            const dateComparison = cB.createdDate.localeCompare(cA.createdDate);

            if (dateComparison === 0) {
              return cB.createdTime.localeCompare(cA.createdTime);
            }

            return dateComparison;
          });

          setPostComments(sortedComments);
        }
      };

      fetch();
    } catch (err) {
      console.error(err);
    }
  }, [urlPostId]);

  const onChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (value.trim().length >= 250) {
      setErrorsMsg({
        activate: true,
        message: "max characters exceeded",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    setCommentMsg(value);
  };

  const onClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const { id } = target;

    if (id !== "handle-comment") return;

    const user = Cookies.get("dXNy");

    if (!user) return;
    const userParse = JSON.parse(user);

    if (commentMsg.trim().length < 2) {
      setErrorsMsg({
        activate: true,
        message: "min characteres allowed is 2",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 1000);

      return;
    }

    console.log(userParse.userId);

    const commentInfo: IComment = {
      message: commentMsg,
      createdDate: moment().format("YYYY-MM-DD"),
      createdTime: moment().format("HH:mm:ss"),
      user: {
        userId: userParse.userId,
      },
      post: {
        postId: Number(urlPostId),
      },
    };

    const obj = await genericFetch(
      { option: "create-comment", endpoint: "create/comment", method: "POST" },
      null,
      commentInfo
    );

    console.log(obj);

    if (!obj) {
      setErrorsMsg({
        activate: true,
        message: "Oops, there was a problem submitting your post",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    setErrorsMsg({
      activate: true,
      message: "Post sent successfully",
    });

    setTimeout(() => {
      setErrorsMsg({
        activate: false,
        message: "",
      });
    }, 3000);

    location.reload();
  };

  return (
    <main className="comments_main">
      <section className="comments_section">
        <CardFetchPost onChange={onChange} onClick={onClick} isComment={true} />
        {errorsMsg.activate ? (
          <span className="comments_error">{errorsMsg.message}</span>
        ) : (
          <span className="comments_prompt">Send your message</span>
        )}
      </section>
      <section className="comments_list">
        {postComments.length > 0 ? (
          postComments.map((c) => {
            return (
              <section key={c.commentId} className="comment_item">
                <span>{c.user.nickname}</span>
                {c.message}
              </section>
            );
          })
        ) : (
          <span className="comments_empty">No comments available</span>
        )}
      </section>
    </main>
  );
}
