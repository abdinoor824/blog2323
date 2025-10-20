import React from 'react'
import styles from "./menuCategories.module.css"
import Link from 'next/link'

const MenuCategories = () => {
    return (
        <div className={styles.categoryList}>
            <Link className={`${styles.categoryItem} ${styles.style}`} href="/blog?cat=style">style</Link>
            <Link className={`${styles.categoryItem} ${styles.travel}`} href="/blog">travel</Link>
            <Link className={`${styles.categoryItem} ${styles.food}`} href="/blog">food</Link>
            <Link className={`${styles.categoryItem} ${styles.codding}`} href="/blog">codding</Link>
              <Link className={`${styles.categoryItem} ${styles.fashion}`} href="/blog">fashion</Link>
                <Link className={`${styles.categoryItem} ${styles.culture}`} href="/blog">culture</Link>
        </div>
    )
}

export default MenuCategories
