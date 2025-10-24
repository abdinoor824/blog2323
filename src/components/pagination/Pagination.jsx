"use client"

import React from 'react'
import styles from './pagination.module.css'
import { useRouter, useSearchParams } from 'next/navigation'

const Pagination = ({page, hasPrevious, hasNext}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentCat = searchParams.get('cat') || '';
    
    // Ensure newPage is a number and within bounds
    newPage = parseInt(newPage, 10);
    if (newPage < 1 || (newPage > page && !hasNext) || (newPage < page && !hasPrevious)) {
      return;
    }

    // Preserve category if it exists
    params.set('page', newPage.toString());
    if (currentCat) {
      params.set('cat', currentCat);
    }

    console.log(`Navigating to page ${newPage}${currentCat ? ` with category ${currentCat}` : ''}`);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.button} 
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <span className={styles.pageNumber}>Page {page}</span>
      <button 
        className={styles.button}
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
