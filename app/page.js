
import CardList from "@/components/cardList/CardList";
import styles from "./page.module.css";

import Featured from "@/components/featured/Featured";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import CategoryList from "@/components/categoryList/CategoryList";

export default async function Home({ searchParams }) {
  // searchParams is an async proxy in the App Router — await it before using
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  return (
  <>
<div className="container">
  <Featured />
  <CategoryList />
  <div className={styles.content}>
  
  <CardList page={page}/>
  <Menu />
 
  </div>

</div>

  </>
  );
}
