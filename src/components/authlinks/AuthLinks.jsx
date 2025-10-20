"use client"

import React, { useState, useRef, useEffect } from 'react'
import styles from "./authlinks.module.css"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
const AuthLinks = () => {
  const [open, setOpen] = useState(false)
  const { status } = useSession()
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return; // only attach when menu is open

    const handlePointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    // use pointerdown for earlier detection on touch devices
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])
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
      <div className={styles.burger} onClick={(e)=> { e.stopPropagation(); setOpen(!open) }}>
           <div className={styles.line}></div>
             <div className={styles.line}></div>
               <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu} ref={menuRef} onClick={(e)=> e.stopPropagation()}>
          <Link href="/" onClick={() => setOpen(false)}>home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>contact</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>home</Link>

          {status === "unauthenticated" ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <>
              <Link href="/write" onClick={() => setOpen(false)}>
                Write
              </Link>
              <span onClick={() => { setOpen(false); signOut(); }} >logout</span>
            </>
          )}

        </div>
      )}
    </>
  )
}

export default AuthLinks
