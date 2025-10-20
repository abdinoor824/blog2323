import React from 'react'
import styles from "./menuPosts.module.css"
import Image from 'next/image'
import Link from 'next/link'
const MenuPost = ({withImage}) => {
  return (
    <div className={styles.items}>

      
      <Link className={styles.item} href="/">
      {withImage && (<div className={styles.imageContainer} >
        <Image
          src="/p1.jpeg"
          alt="Food Image 1"
          fill
         
          className={styles.image}
        />
        
        
       
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.style}`}>style</span>
        <span className={styles.postTitle}>description</span>
        <div className={styles.detail}>
          <span className={styles.username}>auther</span>
          <span className={styles.date}>15.10.2025</span>
        </div>

      </div>
      
      </Link>
       <Link className={styles.item} href="/">
      {withImage && (<div className={styles.imageContainer} >
        <Image
          src="/p1.jpeg"
          alt="Food Image 1"
          fill
         
          className={styles.image}
        />
       
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.food}`}>food</span>
        <span className={styles.postTitle}>description</span>
        <div className={styles.detail}>
          <span className={styles.username}>auther</span>
          <span className={styles.date}>15.10.2025</span>
        </div>

      </div>
      
      </Link>
       <Link className={styles.item} href="/">
      {withImage && (<div className={styles.imageContainer} >
        <Image
          src="/p1.jpeg"
          alt="Food Image 1"
          fill
         
          className={styles.image}
        />
       
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.travel}`}>travel</span>
        <span className={styles.postTitle}>description</span>
        <div className={styles.detail}>
          <span className={styles.username}>auther</span>
          <span className={styles.date}>15.10.2025</span>
        </div>

      </div>
      
      </Link>
       <Link className={styles.item} href="/">
     {withImage && (<div className={styles.imageContainer} >
        <Image
          src="/p1.jpeg"
          alt="Food Image 1"
          fill
         
          className={styles.image}
        />
       
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.codding}`}>codding</span>
        <span className={styles.postTitle}>description</span>
        <div className={styles.detail}>
          <span className={styles.username}>auther</span>
          <span className={styles.date}>15.10.2025</span>
        </div>

      </div>
      
      </Link>
      </div>
  )
}

export default MenuPost
