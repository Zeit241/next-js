import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={'/protected'}>Go to  protected page</Link>
        <Link href={"/api/auth/signin"}>Go to signIn</Link>
    </main>
  )
}
