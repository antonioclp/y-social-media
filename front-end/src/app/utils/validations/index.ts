export const emailValidation = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;

  return regex.test(email);
};

export const passwordValidation = (password: string): boolean => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;

  return regex.test(password);
};

export const nicknameValidation = (nickname: string): boolean => {
  const regex = /^[a-zA-Z]+(?:[.-]?[a-zA-Z]+)*$/;

  return regex.test(nickname);
};

export const genericValidation = (
  email: string,
  username: string,
  nickname: string,
  password: string
) => {
  const min = 4;

  const validation =
    email.length >= min &&
    username.length >= min &&
    nickname.length >= min &&
    password.length >= min;

  return validation;
};
