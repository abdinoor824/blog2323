import React from 'react'
import Pagination from '../pagination/Pagination'
import styles from "./cardList.module.css"
import Card from '../card/Card'

const getData = async (page,cat) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store"
  });
  if (!res) {
    throw new Error("failed")
  }
  return res.json()
}



const CardList = async ({ page,cat }) => {
  const {posts , count} = await getData(page,cat);

  const POST_PER_PAGE = 2;
  const hasPrevious = POST_PER_PAGE  * (page - 1) >0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recents Posts</h1>
      <div className={styles.posts}>

        {posts?.map((item) => (


          <Card item={item} key={item.id} />
        ))
        }


      </div>
      <Pagination page={page}  hasNext={hasNext} hasPrevious={hasPrevious}/>
    </div>
  )
}

export default CardList
