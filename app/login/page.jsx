"use client"

import React from 'react'
import styles from './loginPage.module.css'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
    const {data , status} = useSession();
   if(status === "loading"){
    return <p className={styles.loading}>Loading...</p>
   }
    if(status === "authenticated"){

        return(
            router.push("/")
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.wraper}>
                <button className={styles.socialButton} onClick={()=>signIn("google",)}>Login With Google</button>
                <button className={styles.socialButton}>Login With Github</button>
                <button className={styles.socialButton}>Login With Facebook</button>
            </div>

        </div>
    )
}

export default LoginPage
