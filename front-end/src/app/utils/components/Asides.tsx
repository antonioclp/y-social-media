import Link from "next/link";

interface INavegation {
  nickname: string;
}

export const Navegation = ({ nickname }: INavegation) => {
  return (
    <aside>
      <nav>
        <Link href={`/user/${nickname}`}>Profile</Link>
      </nav>
    </aside>
  );
};

export const Recommendations = () => {
  return (
    <aside>
      <section>Recommendations</section>
    </aside>
  );
};
