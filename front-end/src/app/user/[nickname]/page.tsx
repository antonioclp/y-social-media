"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

// Interfaces
import {
  IGenericResponse,
  IPostsFetch,
  IUpdate,
  IUser,
} from "@/app/utils/interfaces";
import { genericFetch, updateFetch } from "@/app/utils/api";
import { CardFetchUsersPost } from "@/app/utils/components/Cards";

export default function Profile() {
  const [usrObj, setUsrObj] = useState<IUser>({
    email: "",
    password: "",
    nickname: "",
    username: "",
    bio: "",
  });
  const [usrPosts, setUsrPosts] = useState<IPostsFetch[]>([]);
  const [editBioEnable, setEditBioEnable] = useState<boolean>(false);
  const [strBio, setStrBio] = useState<string>("");

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

  const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const { id } = target;

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
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (name === "textarea-bio") {
      setStrBio(value);
    }
  };

  return (
    <main>
      <section>
        <span>{usrObj.nickname}</span>
        <span>{usrObj.username}</span>
        {editBioEnable ? (
          <section>
            <textarea
              placeholder="Insert your bio."
              maxLength={250}
              rows={2}
              cols={20}
              name="textarea-bio"
              onChange={handleChange}
              value={strBio}
            ></textarea>
            <Image
              src="/icons/confirmation.png"
              alt="confirm"
              width={20}
              height={20}
              priority
              id="confirm-edit"
              onClick={handleClick}
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
          onClick={handleClick}
        />
      </section>
      <section>
        {usrPosts.length > 0 ? (
          usrPosts.map((p, index) => (
            <section key={index}>
              <CardFetchUsersPost
                user={p.user}
                createdDate={p.createdDate}
                createdTime={p.createdTime}
                message={p.message}
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
