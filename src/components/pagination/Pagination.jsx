"use client"

import React from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'

const Pagination = ({ page, hasPrevious, hasNext }) => {
  const router = useRouter();

  const goTo = (newPage) => {
    // preserve other query params if needed in the future by using URLSearchParams
    router.push(`?page=${newPage}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => goTo(page - 1)}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <button
        className={styles.button}
        onClick={() => goTo(page + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination
