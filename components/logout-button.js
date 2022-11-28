import styles from "../styles/Home.module.css";

import { useSession, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button className={styles.description} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  } else {
    return <></>;
  }
}
