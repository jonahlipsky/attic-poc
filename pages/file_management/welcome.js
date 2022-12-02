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
        <label>
          Access Key
          <input type="text" id="access-id" />
        </label>
        <label>
          Secret Access Key
          <input type="text" id="secret-access-id" />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
