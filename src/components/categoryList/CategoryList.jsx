import React from 'react'
import styles from "./category.module.css"
import Link from 'next/link'
import Image from 'next/image'
  

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  const categories = Array.isArray(data) ? data : data?.categories || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles[item.slug]} ${styles.style}`}
            key={item.id}
          >
            {item.image && (
              <Image
                src={item.image}
                alt=''
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
