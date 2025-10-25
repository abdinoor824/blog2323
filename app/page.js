
import CardList from "@/components/cardList/CardList";
import styles from "./page.module.css";

import Featured from "@/components/featured/Featured";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import CategoryList from "@/components/categoryList/CategoryList";

// This page reads searchParams for pagination. That makes the page
// dynamic at runtime; explicitly allow dynamic rendering so Next's
// static optimizer doesn't fail the build.
export const dynamic = 'force-dynamic';

export default function Home({ searchParams }) {
  // access searchParams synchronously (do not await it) so it's not
  // treated as a runtime promise which breaks static generation.
  const params = searchParams || {};
  const page = parseInt(params?.page) || 1;
  return (
    <>
      <div className="container">
        <Featured />
        <CategoryList />
        <div className={styles.content}>
          <CardList page={page} />
          <Menu />
        </div>
      </div>
    </>
  );
}
