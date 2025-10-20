import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Menu from '@/components/menu/Menu'
import Coments from '@/components/coments/Coments'




const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
        cache: "no-store"
    });
    if (!res) {
        throw new Error("failed")
    }
    return res.json()
}
const SinglePage = async ({ params }) => {
    // `params` may be async in the Next.js app router; await before using its properties
    const { slug } = await params;
    const data = await getData(slug);
    return (
        <div className={styles.container}>

            <div className={styles.info}>
                <div className={styles.infoLeft}>
                    <span className={styles.title}>  {data?.title}</span>
                   <div className={styles.userInfo}>
                        {data?.user?.image &&  <Image src={data.user.image} alt="" width={40} height={40} className={styles.userImg} />}
                        <div className={styles.userDetail}>
                            <span className={styles.userNmae}>{data?.user.name}</span>
                            <span className={styles.date}>{data.createdAt.substring(0,10)}</span>
                        </div>
                    </div>
                </div>
                {data?.image && <div className={styles.imageContainer}>
                    <Image src={data.image} alt="" fill className={styles.image} />
                </div>}
            </div>
            <div className={styles.content}>
                <div className={styles.post}>

                    <div className={styles.postText} dangerouslySetInnerHTML={{ __html: data?.desc }} />
 




                    <div className={styles.postComents}>
                        <Coments postSlug={slug}/>
                    </div>
                </div>
                <div className={styles.menu}>
                    <Menu />
                </div>
            </div>
        </div>
    )
}

export default SinglePage
