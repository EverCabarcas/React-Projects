import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Delicious meals, created by you.',
};

async function Meals() {
  const meals = await getAllMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite meal and enjoy a delicious lunch or dinner at
          home.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={ <p className={classes.loading}>Loading...</p>}><Meals /></Suspense>
      </main>
    </>
  );
}
