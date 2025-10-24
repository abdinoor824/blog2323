 "use client"


import React, { useState } from 'react'
import styles from './coments.module.css'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from "swr";
import { useSession } from 'next-auth/react'

const fetcher = async (url)=>{
    const res = await fetch(url);
     const data = await res.json();
   
    if(!res.ok){
        const error = new Error(data.message)
          throw error;
    }
    return data;

}

const Coments = ({postSlug}) => {

    const {status} = useSession();
    const {data ,mutate, isLoading,error} =useSWR(`http://localhost:3000/api/coments?postSlug=${postSlug}`, fetcher);
if (error) return <div className={styles.error}>Failed to load comments.</div>;




 const [desc,setDesc] = useState("")

  const handleSubmit =  async()=>{
  await fetch("/api/coments",{
    method :"POST",
     headers: { "Content-Type": "application/json" },
    body :JSON.stringify({desc,postSlug}),
  });
  mutate();
  }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Coments</h1>
            {status === "authenticated" ? (
                <div className={styles.write}>

                    <div className={styles.write2}>

                    <textarea placeholder='write coments....' className={styles.input}rows={4} onChange={(e)=>setDesc(e.target.value)}/>
                    </div>
                    <button className={styles.button} onClick={handleSubmit}>send</button>
                </div>
            ) : (
                <Link className={styles.login} href="/login">Login to write coments</Link>
            )}
            <div className={styles.coments}>
                {isLoading
          ? "Loading..."
          : data?.length > 0
          ? data.map((item) =>(

                
                <div className={styles.coment} key={item.id}>
                    <div className={styles.user}>
                      {item?.user?.image && <Image src={item.user.image} alt="" width={50} height={50} className={styles.avator} />}
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{item.user.name}</span>
                            <span className={styles.date}>{item.createdAt.substring(0,10)}</span>
                        </div>
                    </div>
                    <p className={styles.desc}>
                      {item.desc}
                    </p>

                </div>
          ))
          : "NO comments"}
            </div>

        
        </div>
    )
}

export default Coments
