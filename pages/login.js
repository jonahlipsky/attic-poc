import LoginButton from "../components/login-button";
import { useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return <></>;
  }

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>Please log in!</h1>

        <LoginButton />
      </main>
    </div>
  );
}
