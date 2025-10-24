
import CardList from "@/components/cardList/CardList";
import styles from "./page.module.css";

import Featured from "@/components/featured/Featured";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import CategoryList from "@/components/categoryList/CategoryList";

export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1;
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
