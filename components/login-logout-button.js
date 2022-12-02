import styles from "../styles/Home.module.css";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <button className={styles.description} onClick={() => signOut()}>
        Sign out
      </button>
    );
  } else {
    return (
      <button className={styles.description} onClick={() => signIn()}>
        Sign in
      </button>
    );
  }
}
