import React from 'react'
import styles from "./category.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/utils/connect'

const CategoryList = async () => {
  // Query DB directly on the server — avoid calling localhost during build/deploy
  const data = await prisma.category.findMany();
  const categories = Array.isArray(data) ? data : [];

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
            {(item.img || item.image) && (
              <Image
                src={item.img ?? item.image}
                alt={item.title || ''}
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
