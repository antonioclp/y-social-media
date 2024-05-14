import { fetchLogin } from "../utils/api";

export default async function Login() {
  return (
    <main>
      <form>
        <label htmlFor="password-input">
          <span>Email</span>
          <input type="text" id="email-input" name="email-input" />
        </label>
        <label htmlFor="password-input">
          <span>Password</span>
          <input type="password" id="password-input" name="password-input" />
        </label>
      </form>
    </main>
  );
}
