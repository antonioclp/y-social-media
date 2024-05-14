import { cookies } from "next/headers";
import { fetchLogin } from "../utils/api";
import { redirect } from "next/navigation";

export default async function Login() {
  const formAction = async (form: FormData) => {
    "use server";

    const email = form.get("email-input") as string;
    const password = form.get("password-input") as string;

    const obj = await fetchLogin(email, password);

    cookies().set("dXNy", JSON.stringify(obj.data));
    redirect("/");
  };

  return (
    <main>
      <form action={formAction}>
        <label htmlFor="password-input">
          <span>Email</span>
          <input type="text" id="email-input" name="email-input" />
        </label>
        <label htmlFor="password-input">
          <span>Password</span>
          <input type="password" id="password-input" name="password-input" />
        </label>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
