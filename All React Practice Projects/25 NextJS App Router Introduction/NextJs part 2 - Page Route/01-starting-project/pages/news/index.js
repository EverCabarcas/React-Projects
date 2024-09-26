import Link from "next/link";

export default function News() {
  return <>
  <h1>News</h1>
  <ul>
    <li><Link href='/news/great'>NextJS is a Great Framework</Link></li>
    <li><Link href='/news/something'>Something Else</Link></li>
  </ul>
  </>
}