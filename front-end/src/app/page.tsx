"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

// Components
import { CardFetchPost, CardFetchUsersPost } from "./utils/components/Cards";
import { Header } from "./utils/components/Header";
import { Recommendations } from "./utils/components/Asides";

// Interfaces
import {
  IErrors,
  IGenericResponse,
  IPostsFetch,
  IUser,
} from "./utils/interfaces";
import { genericFetch } from "./utils/api";

// Style
import "@/styles/pages/home.css";

/**
 * Front-end branch.
 */
export default function Home() {
  const [posts, setPosts] = useState<IPostsFetch[]>([]);
  const [usrEmail, setUsrEmail] = useState<string>();
  const [postMsg, setPostMsg] = useState<string>("");
  const [errorsMsg, setErrorsMsg] = useState<IErrors>({
    activate: false,
    message: "",
  });

  useEffect(() => {
    if (!Cookies.get("dXNy")) {
      redirect("/login");
    }

    const obj: IUser = JSON.parse(Cookies.get("dXNy") || "{}");

    if (!obj.email) {
      redirect("/login");
    }

    const fetchPosts = async () => {
      const objs: IGenericResponse = await genericFetch({
        option: "read-all-posts",
        endpoint: "posts",
        method: "GET",
      });

      const { data }: IGenericResponse = objs;

      if (Array.isArray(data)) {
        const posts: IPostsFetch[] = data;
        const sortedPosts = posts.sort((postA, postB) => {
          const dateComparison = postB.createdDate.localeCompare(
            postA.createdDate
          );

          if (dateComparison === 0) {
            return postB.createdTime.localeCompare(postA.createdTime);
          }

          return dateComparison;
        });

        setPosts(sortedPosts);
        return;
      }

      setPosts([]);
    };

    setUsrEmail(obj.email);
    fetchPosts();
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

    setPostMsg(value);
  };

  const onClick = async () => {
    if (postMsg.trim().length < 2) {
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

    const postInfo: IPostsFetch = {
      message: postMsg,
      createdDate: new Date().toISOString().split("T")[0],
      createdTime: new Date().toISOString().split("T")[1].split(".")[0],
      user: {
        email: usrEmail,
      },
    };

    const obj = await genericFetch(
      { option: "create-post", endpoint: "create/post", method: "POST" },
      postInfo
    );

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
  };

  return (
    <main className="hm-main">
      <Header />
      <section className="hm-main-section--1">
        <CardFetchPost onChange={onChange} onClick={onClick} />
        {errorsMsg.activate ? (
          <span>{errorsMsg.message}</span>
        ) : (
          <span>Send your message</span>
        )}
      </section>
      {posts.length >= 1
        ? posts.map((p, index) => {
            return (
              <section key={index} className="hm-main-section--2">
                <CardFetchUsersPost
                  message={p.message}
                  createdDate={p.createdDate}
                  createdTime={p.createdTime}
                  user={p.user}
                />
              </section>
            );
          })
        : null}
      <Recommendations />
    </main>
  );
}
