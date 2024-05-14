"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  emailValidation,
  genericValidation,
  passwordValidation,
} from "../utils/validations";
import { IRegister, IUser } from "../utils/interfaces";
import { fetchLogin } from "../utils/api";

export default function Register() {
  const [usr, setUsr] = useState<IRegister>({
    email: "",
    nickname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [errPassword, setErrPassword] = useState<boolean>(false);

  useEffect(() => {
    const { email, password, nickname, username, confirmPassword } = usr;

    if (
      !emailValidation(email) ||
      !passwordValidation(password) ||
      !genericValidation(username, nickname)
    ) {
      setIsDisable(true);
      return;
    }

    if (confirmPassword !== password) {
      setErrPassword(true);
    }

    setIsDisable(false);
    setErrPassword(false);
  }, [usr]);

  const onSubmit = () => {};

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
      <form onSubmit={onSubmit}>
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
            onChange={onChange}
          />
        </label>
        <button type="submit" disabled={isDisable}>
          Register
        </button>
      </form>
    </main>
  );
}
