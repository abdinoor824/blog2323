import React from 'react'
import styles from "./menu.module.css"
import Link from 'next/link'
import Image from 'next/image'
import MenuPost from '../menuPosts/MenuPost'
import MenuCategories from '../menuCategories/MenuCategories'

const Menu = () => {
  return (
    <div className={styles.container}>

       
      <h2 className={styles.subTitle}>whats hot</h2>
      <h1 className={styles.title}>most popular</h1>
     <MenuPost  withImage={false}/>
      <h2 className={styles.subTitle}>discover by topics </h2>
      <h1 className={styles.title}>categories</h1>
     <MenuCategories/>
      <h2 className={styles.subTitle}>chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
     <MenuPost  withImage={true}/>
    </div>
  )
}

export default Menu
