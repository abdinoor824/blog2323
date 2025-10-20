
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import ThemeTogle from "../themetogle/ThemeTogle";
import AuthLinks from "../authlinks/AuthLinks";


const Navbar = () =>{
    return(
  <div className={styles.container}>
    <div className={styles.social}>

     <Image src="/facebook.png" alt="" width="15" height="15" />
     <Image src="/instagram.png" alt="" width="15" height="15" />
     <Image src="/tiktok.png" alt="" width="15" height="15" />
     <Image src="/youtube.png" alt="" width="15" height="15" />





    </div>
    <div className={styles.logo}>

      NURUDEV
    </div>
    <div className={styles.links}>
      <ThemeTogle />
      <Link href="/" className={styles.link}>
        Home
      </Link>
         <Link href="/about" className={styles.link}>
        Home
      </Link>
         <Link href="/contact" className={styles.link}>
        Home
      </Link>
      <AuthLinks />


    </div>
  </div>
     

    )
}




export default Navbar;



