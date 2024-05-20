"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

// Interfaces
import { IUser } from "@/app/utils/interfaces";

export default function Profile() {
  const [usrObj, setUsrObj] = useState<IUser>({});

  useEffect(() => {
    try {
      if (!Cookies.get("dXNy")) {
        redirect("/login");
      }

      const obj: IUser = JSON.parse(Cookies.get("dXNy") || "{}");

      if (!obj.email && !obj.nickname) {
        redirect("/login");
      }

      setUsrObj(obj);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <main>
      <div>{usrObj.nickname}</div>
    </main>
  );
}
