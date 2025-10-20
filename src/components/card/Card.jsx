import React from 'react'
import styles from "./card.module.css"
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ item}) => {
  console.log(item)
  return (
    <div className={styles.container} >
    {item.image &&   <div className={styles.imageContainer}>
       <Image src={item.image} alt='' fill 
        className={styles.image}
        />
      </div>}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
            <span className={styles.date}>{item.createdAt.substring(0,10)}-</span>
            <Link   href={`/blog?cat=${item.slug}`}
  className={`${styles[item.slug]} ${styles.style}`}
  key={item.id}>
            <span className={styles.category}>{item.catSlug}</span>
            
            </Link>
        </div>
        <Link href= {`/posts/${item.slug}`}>

        <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{item.desc.substring(0,60)}.</p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
        Read more
        </Link>

      </div>
    </div>
  )
}

export default Card
