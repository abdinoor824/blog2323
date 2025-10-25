import React from 'react'
import styles from './blogPage.module.css'
import CardList from '@/components/cardList/CardList'
import Menu from '@/components/menu/Menu'

// This page uses query parameters (searchParams) for pagination and
// category filtering. Allow dynamic rendering at runtime so Next.js
// doesn't attempt static generation across arbitrary query strings.
export const dynamic = 'force-dynamic';

const BlockPage = ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const { cat } = searchParams || {};
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat}blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  )
}

export default BlockPage
