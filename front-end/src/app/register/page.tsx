"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Validations
import {
  emailValidation,
  genericValidation,
  nicknameValidation,
  passwordValidation,
} from "../utils/validations";

// Interfaces
import { IErrors, IRegister } from "../utils/interfaces";

// Fetch
import { fetchRegister } from "../utils/api";

export default function Register() {
  const router = useRouter();

  const [usr, setUsr] = useState<IRegister>({
    email: "",
    nickname: "",
    username: "",
    password: "",
    birthday: "",
    confirmPassword: "",
  });
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [errorsMsg, setErrorsMsg] = useState<IErrors>({
    activate: false,
    message: "",
  });

  useEffect(() => {
    const { email, password, nickname, username, birthday } = usr;

    if (!genericValidation(email, username, nickname, password) || !birthday) {
      setIsDisable(true);
      return;
    }

    setIsDisable(false);
  }, [usr]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, nickname, confirmPassword } = usr;

    if (!emailValidation(email)) {
      setErrorsMsg({
        activate: true,
        message: "Insert a valid email.",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    if (!passwordValidation(password)) {
      setErrorsMsg({
        activate: true,
        message:
          "Password must contain at least one number and one special character.",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    if (!nicknameValidation(nickname)) {
      setErrorsMsg({
        activate: true,
        message: "Nickname can only contain lowercase letters.",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    if (confirmPassword !== password) {
      setIsDisable(true);
      setErrorsMsg({
        activate: true,
        message: "Passwords must be the same.",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    const obj = await fetchRegister(usr);

    if (obj.status !== 201) {
      setErrorsMsg({
        activate: true,
        message: "Email or nickname already registered",
      });

      setTimeout(() => {
        setErrorsMsg({
          activate: false,
          message: "",
        });
      }, 3000);

      return;
    }

    router.push("/login");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    setUsr((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main>
      <form onSubmit={(e) => onSubmit(e)} method="POST">
        <label>
          <span>Email</span>
          <input
            type="text"
            id="email-input"
            name="email"
            onChange={onChange}
          />
        </label>
        <label>
          <span>Username</span>
          <input
            type="text"
            id="username-input"
            name="username"
            onChange={onChange}
          />
        </label>
        <label>
          <span>Nickname</span>
          <input
            type="text"
            id="nickname-input"
            name="nickname"
            onChange={onChange}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            id="password-input"
            name="password"
            onChange={onChange}
          />
        </label>
        <label>
          <span>Confirm password</span>
          <input
            type="password"
            id="confirm-password-input"
            name="confirmPassword"
            onChange={onChange}
          />
        </label>
        <label>
          <span>Birthday</span>
          <input
            type="date"
            id="birthday-input"
            name="birthday"
            min="1924-01-01"
            max={`${new Date().getFullYear()}-${String(
              new Date().getMonth() + 1
            ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
              2,
              "0"
            )}`}
            onChange={onChange}
          />
        </label>
        {errorsMsg.activate && <span>{errorsMsg.message}</span>}
        <button type="submit" disabled={isDisable}>
          Register
        </button>
      </form>
    </main>
  );
}
