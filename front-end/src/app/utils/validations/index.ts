export const emailValidation = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;

  return regex.test(email);
};

export const passwordValidation = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  return regex.test(password);
};

export const genericValidation = (username: string, nickname: string) => {
  const regex = /^[a-z]+$/;
  const min = 4;

  const validation = username.length >= min && nickname.length >= min && regex.test(nickname);

  return validation;
}
