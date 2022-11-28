import styles from "../styles/Home.module.css";

import { useSession, signIn } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return <></>;
  } else {
    return (
      <>
        Not signed in <br />
        <button className={styles.description} onClick={() => signIn()}>
          Sign in
        </button>
      </>
    );
  }
}
