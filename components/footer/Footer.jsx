import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.container}>
       <div className={styles.logo}>
        <div className={styles.logo1}>

          <Image src="/logo.png" alt="" width="160" height="69" className={styles.img}/>
          <span className={styles.name}>NURU DEV</span>
        </div>
        <div className={styles.desc}>  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis</div>
        <div className={styles.icon}>
          <Image src="/facebook.png" alt="" width="30" height="30" />
          <Image src="/instagram.png" alt="" width="30" height="30" />
          <Image src="/tiktok.png" alt="" width="30" height="30" />
          <Image src="/youtube.png" alt="" width="30" height="30" />
        </div>
       </div>
       <div className={styles.lists}>
        <div className={styles.list}>
          <h2 className={styles.title}>links</h2>
          <Link href="/" className={styles.listItem}>Home</Link>
          <Link href="/about" className={styles.listItem}>About</Link>
          <Link href="/contact" className={styles.listItem}>Contact</Link>
        </div>
         <div className={styles.list}>
          <h2 className={styles.title}>tags</h2>
          <Link href="/" className={styles.listItem}>style</Link>
          <Link href="/about" className={styles.listItem}>culture</Link>
          <Link href="/contact" className={styles.listItem}>codding</Link>
        </div>
         <div className={styles.list}>
          <h2 className={styles.title}>socials</h2>
          <Link href="/" className={styles.listItem}>facebook</Link>
          <Link href="/about" className={styles.listItem}>youtube</Link>
          <Link href="/contact" className={styles.listItem}>titkok</Link>
        </div>
       </div>
    </div>
  )
}

export default Footer
