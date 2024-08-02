"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

// Interfaces
import {
  IGenericResponse,
  IGetPosts,
  IUpdate,
  IUser,
} from "@/app/utils/interfaces";

// Utils
import { genericFetch, updateFetch } from "@/app/utils/api";

// Components
import { CardFetchUsersPost } from "@/app/utils/components/Cards";

// Styles
import "@/styles/pages/profile.css"

export default function Profile() {
  const [usrObj, setUsrObj] = useState<IUser>({
    email: "",
    password: "",
    nickname: "",
    username: "",
    bio: "",
  });
  const [usrPosts, setUsrPosts] = useState<IGetPosts[]>([]);
  const [editBioEnable, setEditBioEnable] = useState<boolean>(false);
  const [strBio, setStrBio] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCookie = Cookies.get("dXNy");

        if (!userCookie) {
          redirect("/login");
        }

        const obj: IUser = JSON.parse(userCookie);

        if (!obj.email || !obj.nickname) {
          redirect("/login");
        }

        setUsrObj(obj);
        setStrBio(obj.bio || "");

        const res = await genericFetch(
          {
            endpoint: "posts",
            method: "GET",
            option: "read-user-posts",
          },
          null,
          obj.nickname
        );

        if (res.data !== null && Array.isArray(res.data)) {
          setUsrPosts(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const onClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const { id, alt } = target;

    if (id === "edit-bio") {
      setEditBioEnable(true);
      return;
    }

    if (id === "confirm-edit") {
      const { email, password } = usrObj;

      if (email && password) {
        const obj: IUpdate = {
          email,
          password,
          bio: strBio,
        };

        const updatedUser: IGenericResponse = await updateFetch(obj);
        const newInfo = updatedUser.data as IUser;

        setUsrObj((prev) => ({
          ...prev,
          username: newInfo.username,
          nickname: newInfo.nickname,
          bio: newInfo.bio,
        }));

        setStrBio(newInfo.bio || "");
        Cookies.set("dXNy", JSON.stringify({ ...usrObj, bio: newInfo.bio }));
        setEditBioEnable(false);
      }
    }

    if (alt === "comments") {
      const artcl = target.closest("article");

      if (!artcl) {
        return;
      }

      router.push(`/post/${artcl.id}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (name === "textarea-bio") {
      setStrBio(value);
    }
  };

  return (
    <main className="profile-m">
      <section className="profile-m--header">
        <span>{usrObj.nickname}</span>
        <span>{usrObj.username}</span>
        {editBioEnable ? (
          <section className="profile-m--header-edit">
            <textarea
              placeholder="Insert your bio."
              maxLength={250}
              rows={2}
              cols={20}
              name="textarea-bio"
              onChange={onChange}
              value={strBio}
            ></textarea>
            <Image
              src="/icons/confirmation.png"
              alt="confirm"
              width={20}
              height={20}
              priority
              id="confirm-edit"
              onClick={onClick}
            />
          </section>
        ) : (
          <p>{usrObj.bio}</p>
        )}
        <Image
          src="/icons/edit.png"
          alt="bio"
          width={20}
          height={20}
          priority
          id="edit-bio"
          onClick={onClick}
        />
      </section>
      <section className="profile-m--posts">
        {usrPosts.length > 0 ? (
          usrPosts.map((p, index) => (
            <section key={index} className="profile-m--posts-item">
              <CardFetchUsersPost
                postId={p.postId}
                user={p.user}
                createdDate={p.createdDate}
                createdTime={p.createdTime}
                message={p.message}
                onClick={onClick}
              />
            </section>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </section>
    </main>
  );
}
