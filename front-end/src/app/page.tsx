import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Front-end branch.
 */
export default function Home() {
  if (!cookies().get("dXNy")) {
    redirect("/login");
  }

  return (
    <main>
      <span>Nextjs</span>
    </main>
  );
}
