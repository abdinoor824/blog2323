"use client"

import React, { useState, useEffect } from 'react'
import styles from "./authlinks.module.css"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
const AuthLinks = () => {
  const [open, setOpen] = useState(false)
  const {status} = useSession()

  // Handle body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to ensure body scroll is restored
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setOpen(false);
  };

  // Toggle menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (

    
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
       
        <Link href="/write" className={styles.link}>
          Write
        </Link>
        <span className={styles.link} onClick={signOut}>logout</span>
         </>
      )}
      <div 
        className={`${styles.burger} ${open ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-expanded={open}
        role="button"
        tabIndex={0}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/" onClick={handleLinkClick}>Home</Link>
          <Link href="/about" onClick={handleLinkClick}>About</Link>
          <Link href="/contact" onClick={handleLinkClick}>Contact</Link>
          
          {status === "unauthenticated" ? (
            <Link href="/login" onClick={handleLinkClick}>
              Login
            </Link>
          ) : (
            <>
              <Link href="/write" onClick={handleLinkClick}>
                Write
              </Link>
              <span 
                onClick={() => {
                  handleLinkClick();
                  signOut();
                }}
                className={styles.menuLink}
              >
                Logout
              </span>
            </>
          )}


      </div>
     )

     
     


     }
    </>
  )
}

export default AuthLinks
