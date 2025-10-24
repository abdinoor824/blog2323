import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Menu from '@/components/menu/Menu'
import Coments from '@/components/coments/Coments'
import { prisma } from '../../../../utils/connect'




const getData = async (slug) => {
    // Query the database directly from the server component to avoid
    // making an internal HTTP request (which requires an absolute URL
    // during SSR and can fail with "Invalid URL").
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { user: true },
    });
    if (!post) return null;

    // Normalize fields for the frontend
    return {
        ...post,
        image: post?.image ?? post?.img ?? null,
        createdAt: post.createdAt ? post.createdAt.toISOString() : null,
    };
}
const SinglePage = async ({ params }) => {
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
                        <Coments postSlug={slug} />
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
