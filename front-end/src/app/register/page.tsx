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
import { IErrors, IRegisterForm } from "../utils/interfaces";

// Fetch
import { fetchRegister } from "../utils/api";

// Style
import "@/styles/pages/register.css";
import Image from "next/image";

export default function Register() {
  const router = useRouter();

  const maxDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(maxDate.getFullYear() - 100);

  const maxDateString = `${maxDate.getFullYear()}-${String(
    maxDate.getMonth() + 1
  ).padStart(2, "0")}-${String(maxDate.getDate()).padStart(2, "0")}`;

  const minDateString = `${minDate.getFullYear()}-${String(
    minDate.getMonth() + 1
  ).padStart(2, "0")}-${String(minDate.getDate()).padStart(2, "0")}`;

  const [usr, setUsr] = useState<IRegisterForm>({
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

    const { email, password, nickname, confirmPassword, birthday } = usr;

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
      console.log(password);
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

    if (2024 - Number(birthday.split("-")[0]) <= 14) {
      setIsDisable(true);
      setErrorsMsg({
        activate: true,
        message: "Invalid age",
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
    <main className="rgs-m">
      <form onSubmit={(e) => onSubmit(e)} method="POST" className="rgs-m--form">
        <Image
          src="/icons/y-logo.png"
          alt="y"
          width={100}
          height={100}
          priority
        />
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
            min={minDateString}
            max={`${maxDateString}`}
            onChange={onChange}
          />
        </label>
        <section>
          {errorsMsg.activate ? (
            <span id="rgs-m--form_err">{errorsMsg.message}</span>
          ) : (
            <span>Register your own account</span>
          )}
          <button type="submit" disabled={isDisable}>
            Confirm
          </button>
        </section>
      </form>
    </main>
  );
}
