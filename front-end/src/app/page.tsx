"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

// Components
import { CardFetchPost, CardFetchUsersPost } from "./utils/components/Cards";
import { Header } from "./utils/components/Header";
import { Recommendations } from "./utils/components/Asides";

// Interfaces
import { IErrors, IUser } from "./utils/interfaces";

/**
 * Front-end branch.
 */
export default function Home() {
  const [usrEmail, setUsrEmail] = useState<string>();
  const [postMsg, setPostMsg] = useState<string>("");
  const [errorsMsg, setErrorsMsg] = useState<IErrors>({
    activate: false,
    message: "",
  });
  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!Cookies.get("dXNy")) {
      redirect("/login");
    }
    const obj: IUser = JSON.parse(Cookies.get("dXNy") || "{}");

    if (!obj.email) {
      redirect("/login");
    }

    setUsrEmail(obj.email);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length >= 250) {
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

    if (value.length === 0) {
      setIsDisable(true);

      return;
    }

    setIsDisable(false);
    setPostMsg(value);
  };

  const onClick = () => {
    console.log("oi");
  };

  return (
    <main>
      <Header />
      <section>
        <CardFetchPost
          onChange={onChange}
          onClick={onClick}
          disable={isDisable}
        />
      </section>
      <section>
        <CardFetchUsersPost />
      </section>
      <Recommendations />
    </main>
  );
}
