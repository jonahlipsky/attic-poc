import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import handleSubmit from "../../lib/functions/handle_submit";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <>Loading...</>;
  } else if (status == "unauthenticated") {
    router.push("/");
    return <></>;
  }

  const welcomeMessage = `Welcome ${session.user.name}`;
  return (
    <div>
      {welcomeMessage}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="file" id="file-upload-input" />
        <input type="submit" />
      </form>
    </div>
  );
}
