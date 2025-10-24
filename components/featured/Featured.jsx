import React from 'react'
import styles from "./featured.module.css"
import Image from 'next/image'
const Featured = () => {
  return (
    <div className={styles.container}> 
     <div className={styles.title}>
     <b>Hey, NURU dev here!</b> Discover my stories and creative ideas.
     </div>
     <div className={styles.post}>
     <div className={styles.imgContainer}>
      <Image src="/p1.jpeg" alt='' fill className={styles.image} />

     </div>
     <div className={styles.textContainer}>
      <h1 className={styles.postTitle}>loreum ipsum</h1>
      <p className={styles.postDescription}>
       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
      </p>
      <button className={styles.button}>Read more</button>
     </div>
     </div>
    </div>
  )
}

export default Featured
