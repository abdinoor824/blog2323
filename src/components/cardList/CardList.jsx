import React from "react";
import Pagination from "../pagination/Pagination";
import styles from "./cardList.module.css";
import Card from "../card/Card";

const getData = async (page, cat) => {
  // ✅ Use absolute URL, based on NEXTAUTH_URL
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  // Normalize image field for all posts
  const normalizedPosts = data.posts.map((post) => ({
    ...post,
    image: post?.image ?? post?.img ?? null,
  }));

  console.log("CardList data:", {
    count: data.count,
    firstPostImage: normalizedPosts[0]?.image,
  });

  return { posts: normalizedPosts, count: data.count };
};

const CardList = async ({ page, cat }) => {
  // Ensure page is a number
  const currentPage = parseInt(page || "1", 10);
  const { posts, count } = await getData(currentPage, cat);
  console.log("CardList posts:", posts?.map((p) => ({ id: p.id, image: p.image })));

  const POST_PER_PAGE = 2;
  const hasPrevious = currentPage > 1;
  const hasNext = POST_PER_PAGE * (currentPage - 1) + POST_PER_PAGE < count;
  
  console.log('Pagination state:', {
    currentPage,
    count,
    hasPrevious,
    hasNext,
    totalPages: Math.ceil(count / POST_PER_PAGE)
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <Pagination page={currentPage} hasNext={hasNext} hasPrevious={hasPrevious} />
    </div>
  );
};

export default CardList;
